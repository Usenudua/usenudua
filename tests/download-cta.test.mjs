import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const header = readFileSync("components/header.tsx", "utf8");
const hero = readFileSync("components/hero.tsx", "utf8");

assert.ok(
  header.includes(`fetch("https://api.usenudua.com.ng/api/downloads/latest-apk"`),
  "header should fetch the dynamic download URL instead of using a static asset"
);
assert.ok(
  hero.includes(`fetch("https://api.usenudua.com.ng/api/downloads/latest-apk"`),
  "hero should fetch the dynamic download URL instead of using a static asset"
);

assert.doesNotMatch(
  header,
  /onClick=\{handleDownload\}/,
  "header download CTAs should be anchor links instead of JS click buttons"
);
assert.doesNotMatch(
  hero,
  /onClick=\{handleDownload\}/,
  "hero download CTA should be an anchor link instead of a JS click button"
);
assert.match(
  header,
  /const downloadProps = primaryUrl/,
  "header should conditionally set href using primaryUrl"
);
assert.match(
  header,
  /\{...downloadProps\}/,
  "header should spread downloadProps into anchor tags"
);

assert.match(
  hero,
  /href=\{primaryUrl\}/,
  "hero should conditionally set href to primaryUrl"
);
assert.match(
  hero,
  /disabled=\{!primaryUrl\}/,
  "hero download button should be disabled when primaryUrl is absent"
);
