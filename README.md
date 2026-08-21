# Usenudua coded compass

This package converts the interactive portion of the artwork into a Next.js component while retaining the supplied artwork as the high-fidelity scene layer.

## Architecture

### Scene image
The supplied artwork is used only for the environmental artwork:
- mountain/sunrise quadrant
- sunset quadrant
- savanna quadrant
- ocean quadrant
- carved figure
- staffs/spear
- bowl/cowries
- mask and decorative compass geometry
- existing typography and ornamental detail

### Independent dial data
The 10 values surrounding the mask are **not read from or tied to the image**.

They are rendered as HTML/CSS:

```ts
const NUMBERS = ["0","1","2","3","4","5","6","7","8","9"];
const VOWELS = ["a","e","ə","i","ị","o","ọ","ʌ","u","ụ"];
```

The component randomly chooses one system on client mount.

Therefore:

- numbers/vowels can be randomized without changing the background image;
- the same background scene can display either system;
- the values can later be randomized, rotated, shuffled, or driven by calendar state independently.

## Responsive image selection

```text
< 768px  → portrait base
≥ 768px  → landscape base
```

The choice is based on the actual browser viewport, not on which dial system is selected.

The two choices are independent:

```text
screen size ──────► portrait / landscape scene
random dial ───────► numbers / vowels
```

## Mask hover

Hovering/focusing the central mask produces a blue/gold radial glow only.

There is deliberately **no hover text, tooltip, caption, or label**.

## Home transition

Clicking the mask launches a 900ms radial transition:
- darkens the scene;
- creates a blue luminous core;
- expands concentric gold rings;
- visually pulls the viewer through the central mask;
- navigates to `/home`.

Change the destination in `enterHome()` if your home route differs.

## Install

Copy:

- `components/UsenuduaHome.tsx`
- `styles.css`
- `public/usenudua/*`

into the Next.js project.

Then:

```tsx
import UsenuduaHome from "@/components/UsenuduaHome";

export default function Page() {
  return <UsenuduaHome />;
}
```

## Fidelity note

The supplied artwork is retained as the scene layer because reproducing the mountain, ocean, lighting, carved objects, mask artwork, and fine ornamental geometry procedurally in CSS/SVG would reduce fidelity.

The parts that must be dynamic — the ten numbers/vowels — are explicitly removed from the application's dependency on the image and rendered as independent code.
