"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

type DialMode = "numbers" | "vowels";

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Clockwise from the top, matching the original 0-9 positions.
const VOWELS = ["a", "e", "ə", "i", "ị", "o", "ọ", "ʌ", "u", "ụ"];

// ---------------------------------------------------------------------------
// Marker/mask geometry, expressed as FRACTIONS OF THE SOURCE IMAGE's own
// natural pixel dimensions (0-1), not as frame-relative CSS percentages,
// so it can be re-projected onto whatever crop object-fit: cover produces
// at the current viewport size (see projectPoint below). A fraction of the
// IMAGE means the same point on the art no matter how much of the image is
// currently cropped off; a fraction of the FRAME does not.
//
// All 10 marker positions sit on a single uniform radius from the dial
// center -- the same radius data-pos 1 and 9 were already on -- using a
// 12-position clock face (30 degrees apart: 0,30,60,90,120,150,180,210,
// 240,270,300,330), with the two slots that land exactly on the tree
// (270deg) and sun (90deg) icons skipped. That leaves 10 slots at
// 0,30,60,120,150,180,210,240,300,330 for the 10 numbers/vowels.
//
// data-pos 0 (0deg, toward mountain) and data-pos 5 (180deg, toward
// wave) sit on the same full radius as the rest, landing directly on
// top of those two icons by design. Legibility against the icon
// artwork underneath is handled with marker styling (an outline +
// backing chip in styles.css), not by moving the marker off the icon.
// ---------------------------------------------------------------------------

type Point = { fx: number; fy: number };

const PORTRAIT_NATURAL = { width: 864, height: 1821 };
const PORTRAIT_MASK: Point & { diameter: number } = {
  fx: 0.4926,
  fy: 0.4169,
  diameter: 0.216, // fraction of image width
};
const PORTRAIT_POSITIONS: Point[] = [
  { fx: 0.4926, fy: 0.3246 }, // 0deg  -- on the mountain icon
  { fx: 0.5898, fy: 0.3370 }, // 30deg
  { fx: 0.6610, fy: 0.3707 }, // 60deg
  { fx: 0.6610, fy: 0.4630 }, // 120deg
  { fx: 0.5898, fy: 0.4968 }, // 150deg
  { fx: 0.4926, fy: 0.5091 }, // 180deg -- on the wave icon
  { fx: 0.3954, fy: 0.4968 }, // 210deg
  { fx: 0.3242, fy: 0.4630 }, // 240deg
  { fx: 0.3242, fy: 0.3707 }, // 300deg
  { fx: 0.3954, fy: 0.3370 }, // 330deg
];
const PORTRAIT_MARKER_SIZE = 0.064; // fraction of image width

const LANDSCAPE_NATURAL = { width: 1738, height: 905 };
// Re-derived from the true dial center/radius measured directly off the
// artwork (via the mountain/wave/tree/sun badges baked into the image),
// not recomputed by eye. The previous constants were off by ~0.047 in fy
// (~43px on the 905px-tall source), which put every marker and the mask
// off the ring/icons they're meant to sit on.
const LANDSCAPE_MASK: Point & { diameter: number } = {
  fx: 0.5016,
  fy: 0.5298,
  diameter: 0.1, // fraction of image width
};
const LANDSCAPE_POSITIONS: Point[] = [
  { fx: 0.5016, fy: 0.3572 }, // 0deg  -- on the mountain icon
  { fx: 0.5465, fy: 0.3803 }, // 30deg
  { fx: 0.5794, fy: 0.4435 }, // 60deg
  { fx: 0.5794, fy: 0.6162 }, // 120deg
  { fx: 0.5465, fy: 0.6794 }, // 150deg
  { fx: 0.5016, fy: 0.7025 }, // 180deg -- on the wave icon
  { fx: 0.4566, fy: 0.6794 }, // 210deg
  { fx: 0.4237, fy: 0.6162 }, // 240deg
  { fx: 0.4237, fy: 0.4435 }, // 300deg
  { fx: 0.4566, fy: 0.3803 }, // 330deg
];
const LANDSCAPE_MARKER_SIZE = 0.03; // fraction of image width

/**
 * Projects a point given as a fraction of the source image's natural
 * dimensions onto a fraction of the CONTAINER's rendered dimensions,
 * given that the image is displayed with object-fit: cover inside that
 * container. Cover-fit scales the image uniformly by
 * `scale = max(containerW / imgW, containerH / imgH)` and centers it,
 * cropping whichever axis overflows -- this reverses that so a marker
 * tied to a specific point on the art stays pinned to that point no
 * matter how the current viewport crops the image.
 */
function projectPoint(
  point: Point,
  natural: { width: number; height: number },
  container: { width: number; height: number }
): Point {
  if (container.width === 0 || container.height === 0) return point;
  const scale = Math.max(
    container.width / natural.width,
    container.height / natural.height
  );
  const displayedW = natural.width * scale;
  const displayedH = natural.height * scale;
  const offsetX = (displayedW - container.width) / 2;
  const offsetY = (displayedH - container.height) / 2;
  const px = point.fx * displayedW - offsetX;
  const py = point.fy * displayedH - offsetY;
  return { fx: px / container.width, fy: py / container.height };
}

/** Pixel size of something defined as a fraction of the image's natural
 * width, once that image is displayed (uniformly scaled) via cover-fit. */
function projectSize(
  fractionOfImageWidth: number,
  natural: { width: number; height: number },
  container: { width: number; height: number }
): number {
  if (container.width === 0 || container.height === 0) return 0;
  const scale = Math.max(
    container.width / natural.width,
    container.height / natural.height
  );
  return fractionOfImageWidth * natural.width * scale;
}

export default function UsenuduaHome() {
  const router = useRouter();
  const [mode, setMode] = useState<DialMode>("vowels");
  const [isLandscape, setIsLandscape] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const frameRef = useRef<HTMLDivElement | null>(null);

  // Randomize the dial data on an ongoing basis (not just once at mount) so
  // the compass feels alive for as long as the portal is open. Organic,
  // randomized interval (not a fixed metronome) so it doesn't feel mechanical.
  useEffect(() => {
    let cancelled = false;
    function scheduleNext() {
      const delay = 3200 + Math.random() * 3600; // ~3.2s-6.8s
      const t = setTimeout(() => {
        if (cancelled) return;
        setMode((m) => (m === "numbers" ? "vowels" : "numbers"));
        scheduleNext();
      }, delay);
      return t;
    }
    setMode(Math.random() < 0.5 ? "numbers" : "vowels");
    const t = scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsLandscape(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Edge-to-edge fill means the frame's rendered box is whatever the
  // viewport currently is (no fixed aspect ratio), so the crop object-fit:
  // cover applies changes continuously with viewport size -- this observer
  // keeps containerSize current so marker/mask projection stays correct
  // through resizes, orientation changes, and devtools panel toggles.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () =>
      setContainerSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // This array is data, not image content. It can be randomized independently.
  const dialValues = useMemo(
    () => (mode === "numbers" ? NUMBERS : VOWELS),
    [mode]
  );

  const sceneSrc = isLandscape
    ? "/usenudua/compass-landscape-base.png"
    : "/usenudua/compass-portrait-base.png";

  const natural = isLandscape ? LANDSCAPE_NATURAL : PORTRAIT_NATURAL;
  const positions = isLandscape ? LANDSCAPE_POSITIONS : PORTRAIT_POSITIONS;
  const mask = isLandscape ? LANDSCAPE_MASK : PORTRAIT_MASK;
  const markerSizeFraction = isLandscape
    ? LANDSCAPE_MARKER_SIZE
    : PORTRAIT_MARKER_SIZE;

  const projectedPositions = useMemo(
    () => positions.map((p) => projectPoint(p, natural, containerSize)),
    [positions, natural, containerSize]
  );
  const projectedMask = useMemo(
    () => projectPoint(mask, natural, containerSize),
    [mask, natural, containerSize]
  );
  const markerSizePx = useMemo(
    () => projectSize(markerSizeFraction, natural, containerSize),
    [markerSizeFraction, natural, containerSize]
  );
  const maskSizePx = useMemo(
    () => projectSize(mask.diameter, natural, containerSize),
    [mask.diameter, natural, containerSize]
  );

  const enterHome = () => {
    if (transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      router.push("/home");
    }, 760);
  };

  return (
    <main className="usenudua-hero" aria-label="Usenudua">
      <div className="usenudua-scene-frame" aria-hidden="true" ref={frameRef}>
        <Image
          src={sceneSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="usenudua-scene-image"
        />
        {/* The wheel values are HTML, not baked into the scene image. */}
        <div className="usenudua-dial-layer" aria-label={`${mode} dial`}>
          <div className="usenudua-dial">
            {dialValues.map((value, index) => {
              const pos = projectedPositions[index];
              return (
                <span
                  key={`${mode}-${index}`}
                  className="usenudua-marker"
                  data-pos={index}
                  aria-hidden="true"
                  style={{
                    left: `${(pos?.fx ?? 0) * 100}%`,
                    top: `${(pos?.fy ?? 0) * 100}%`,
                    width: `${markerSizePx}px`,
                    height: `${markerSizePx}px`,
                    fontSize: `${Math.min(
                      Math.max(markerSizePx * 0.62, 15),
                      26
                    )}px`,
                  }}
                >
                  {value}
                </span>
              );
            })}
            {/* Glow-only interaction: deliberately no tooltip/text. */}
            <button
              type="button"
              className="usenudua-mask"
              aria-label="Enter Usenudua"
              onClick={enterHome}
              style={{
                left: `${projectedMask.fx * 100}%`,
                top: `${projectedMask.fy * 100}%`,
                width: `${maskSizePx}px`,
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`usenudua-transition ${transitioning ? "is-active" : ""}`}
        aria-hidden="true"
      />
    </main>
  );
}
