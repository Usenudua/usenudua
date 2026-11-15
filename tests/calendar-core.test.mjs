import assert from "node:assert/strict";
import { getDayLabel, getLabelSet } from "../lib/calendar-core.ts";

// Expected day sets for each supported traditional calendar
const EXPECTED_LABELS = {
  efik: [
    "Ekpri Ibibio",
    "Akwa Ikwo",
    "Akwa Ofioñ",
    "Akwa Ederi",
    "Akwa Ibibio",
    "Ekpri Ikwo",
    "Ekpri Ofioñ",
    "Ekpri Ederi",
  ],
  annang: [
    "Obo",
    "Uruabom",
    "Offioñ",
    "Adet",
    "Aditaha",
    "Atim",
    "Akenyoñ",
    "Urua-Ette",
  ],
  oro: [
    "Obriboñ",
    "Uwe",
    "Ududa",
    "Odiebo",
    "Nwikpi",
    "Ububo",
    "Uruesañ",
    "Odieto",
  ],
  ibibio: [
    "Obo",
    "Edemobo",
    "Fioñadan",
    "Aderetaha",
    "Etaha",
    "Edemetaha",
    "Fioñetok",
    "Adereobo",
  ],
  ubium: [
    "Obo",
    "Uduam",
    "Fioñadan",
    "Aderetaha",
    "Ataetaha",
    "Udua Ukat",
    "Fioñetok",
    "Adereobo",
  ],
};

// 1. Verify getLabelSet for each language
for (const [lang, expected] of Object.entries(EXPECTED_LABELS)) {
  const actual = getLabelSet(lang);
  assert.deepEqual(
    actual,
    expected,
    `getLabelSet('${lang}') returned unexpected labels: ${JSON.stringify(actual)}`
  );
}

// 2. Explicitly test known Efik day label bug regressions
const efikLabels = getLabelSet("efik");
assert.equal(efikLabels[2], "Akwa Ofioñ", "Efik day 2 must be 'Akwa Ofioñ' without trailing 'n'");
assert.equal(efikLabels[4], "Akwa Ibibio", "Efik day 4 must be 'Akwa Ibibio' without typo 'k'");
assert.equal(efikLabels[6], "Ekpri Ofioñ", "Efik day 6 must be 'Ekpri Ofioñ' without glyph corruption 'Ÿ'");

// 3. Verify getDayLabel cycling over an 8-day period starting from 1960-01-01
const baseDate = new Date(1960, 0, 1);
for (let i = 0; i < 8; i++) {
  const testDate = new Date(1960, 0, 1 + i);
  const label = getDayLabel(testDate, "efik");
  assert.equal(
    label,
    EXPECTED_LABELS.efik[i],
    `getDayLabel on day ${i} expected '${EXPECTED_LABELS.efik[i]}', got '${label}'`
  );
}

console.log("✅ All calendar-core tests passed!");
