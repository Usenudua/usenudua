import assert from "node:assert/strict";

const urlArg = process.argv[2];
if (!urlArg) {
  console.error("Usage: node smoke-test.mjs <target-url>");
  process.exit(1);
}

const targetUrl = new URL(urlArg);

async function checkEndpoint(path, expectOpenNext) {
  const fullUrl = new URL(path, targetUrl).toString();
  console.log(`Testing ${fullUrl} ...`);
  const res = await fetch(fullUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Smoke Test)" }
  });
  
  assert.equal(res.status, 200, `Expected 200 OK for ${path}`);
  
  const hasOpenNext = res.headers.has("x-opennext");
  if (expectOpenNext) {
    assert.ok(hasOpenNext, `Expected x-opennext header to be present on ${path}`);
  } else {
    assert.ok(!hasOpenNext, `Expected x-opennext header to be ABSENT on ${path} (Worker bypass failed)`);
  }
}

async function checkMetadata() {
  const fullUrl = new URL("/", targetUrl).toString();
  console.log(`Testing metadata on ${fullUrl} ...`);
  const res = await fetch(fullUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Smoke Test)" }
  });
  
  assert.equal(res.status, 200, "Expected 200 OK for homepage");
  const html = await res.text();
  assert.ok(html.includes("Usenudua - Cultural Calendar App"), "Expected corrected branding in HTML");
}

async function run() {
  try {
    // 1. Nested static artwork (should bypass Worker)
    await checkEndpoint("/usenudua/compass-landscape-base.png", false);
    
    // 2. Root static asset (should bypass Worker)
    await checkEndpoint("/icon.png", false);
    
    // 3. Dynamic SSR control (MUST invoke Worker)
    await checkEndpoint("/verify", true);
    
    // 4. Branding metadata check
    await checkMetadata();
    
    console.log("\n✅ All smoke tests passed!");
  } catch (err) {
    console.error("\n❌ Smoke test failed:");
    console.error(err);
    process.exit(1);
  }
}

run();
