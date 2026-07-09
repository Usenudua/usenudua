import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const latest = JSON.parse(readFileSync("public/latest.json", "utf8"));
const header = readFileSync("components/header.tsx", "utf8");
const hero = readFileSync("components/hero.tsx", "utf8");

assert.match(latest.url, /usenudua-v2\.0\.3\.apk$/);
assert.ok(
  header.includes(`useState("${latest.url}")`),
  "header default download URL should match public/latest.json",
);
assert.ok(
  hero.includes(`primary: "${latest.url}"`),
  "hero default download URL should match public/latest.json",
);

assert.doesNotMatch(
  header,
  /onClick=\{handleDownload\}/,
  "header download CTAs should be anchor links instead of JS click buttons",
);
assert.doesNotMatch(
  hero,
  /onClick=\{handleDownload\}/,
  "hero download CTA should be an anchor link instead of a JS click button",
);
assert.match(
  header,
  /href=\{primaryUrl\}/,
  "header should render the resolved download URL as an href",
);
assert.match(
  hero,
  /href=\{downloadUrls\.primary\}/,
  "hero should render the resolved download URL as an href",
);
