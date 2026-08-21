import Image from "next/image";
import { useEffect, useState } from "react";

type Variant = "numbers" | "vowels";

type CompassArtworkProps = {
  className?: string;
  priority?: boolean;
};

const artwork = {
  numbers: {
    portrait: "/usenudua/compass-numbers-portrait.png",
    // Until a standalone landscape-number source is supplied, keep the
    // numbered artwork independent from the vowel artwork.
    landscape: "/usenudua/compass-numbers-portrait.png",
    alt: "Usenudua compass with numbers",
  },
  vowels: {
    portrait: "/usenudua/compass-vowels-portrait.png",
    landscape: "/usenudua/compass-vowels-landscape.png",
    alt: "Usenudua compass with Ibibio vowels",
  },
} as const;

function randomVariant(): Variant {
  return Math.random() < 0.5 ? "numbers" : "vowels";
}

export default function CompassArtwork({
  className = "",
  priority = false,
}: CompassArtworkProps) {
  // Fixed initial value prevents SSR/client hydration mismatch.
  const [variant, setVariant] = useState<Variant>("vowels");
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    // Variant is randomized independently of orientation/image selection.
    setVariant(randomVariant());

    const media = window.matchMedia("(min-width: 768px)");

    const updateOrientation = () => {
      setIsLandscape(media.matches);
    };

    updateOrientation();
    media.addEventListener("change", updateOrientation);

    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  const item = artwork[variant];
  const src = isLandscape ? item.landscape : item.portrait;

  return (
    <div className={`w-full ${className}`}>
      <Image
        key={`${variant}-${isLandscape ? "landscape" : "portrait"}`}
        src={src}
        alt={item.alt}
        width={isLandscape ? 1672 : 1536}
        height={isLandscape ? 941 : 1536}
        priority={priority}
        className="block h-auto w-full object-contain"
        sizes="100vw"
      />
    </div>
  );
}
