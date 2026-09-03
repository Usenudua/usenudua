import assert from "node:assert/strict";

const urlArg = process.argv[2];
if (!urlArg) {
  console.error("Usage: node smoke-test.mjs <target-url>");
  process.exit(1);
}

const targetUrl = new URL(urlArg);

async function checkEndpoint(path, expectOpenNext, expectedCacheControl) {
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
  
  if (expectedCacheControl) {
    const cc = res.headers.get("cache-control");
    assert.ok(
      cc && cc.includes(expectedCacheControl),
      `Expected Cache-Control to include '${expectedCacheControl}' on ${path}, got '${cc}'`
    );
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
  return html; // return for reuse
}

async function run() {
  try {
    // 1. Nested static artwork (should bypass Worker + 7-day browser cache)
    await checkEndpoint("/usenudua/compass-landscape-base.png", false, "max-age=604800");
    
    // 2. Root static asset (should bypass Worker)
    await checkEndpoint("/icon.png", false);
    
    // 3. Dynamic SSR control (MUST invoke Worker; _headers must NOT affect it)
    await checkEndpoint("/verify", true);
    // Also assert _headers didn't leak caching onto this SSR route
    const verifyRes = await fetch(new URL("/verify", targetUrl).toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (Smoke Test)" }
    });
    const verifyCC = verifyRes.headers.get("cache-control") ?? "";
    assert.ok(
      !verifyCC.includes("max-age=604800") && !verifyCC.includes("immutable"),
      `Expected /verify Cache-Control to be uncacheable, got '${verifyCC}'`
    );
    
    // 4. Branding metadata check — also returns HTML for reuse in test 5
    const homepageHtml = await checkMetadata();
    
    // 5. /_next/static/* (should bypass Worker + 1-year immutable browser cache)
    // Path is discovered at runtime from homepage HTML — avoids hardcoding build-specific hashes
    // that break on the next deploy when Next.js regenerates chunk filenames.
    const chunkMatch = homepageHtml.match(/\/_next\/static\/chunks\/[a-f0-9]+-[a-f0-9]+\.js/);
    assert.ok(chunkMatch, "Could not find a /_next/static/chunks/ path in homepage HTML to test");
    console.log(`  (discovered chunk: ${chunkMatch[0]})`);
    await checkEndpoint(chunkMatch[0], false, "immutable");
    
    // 6. Android App Links (guarantees commit 4164cfa regression cannot recur)
    await checkEndpoint("/.well-known/assetlinks.json", false);
    
    console.log("\n✅ All smoke tests passed!");
  } catch (err) {
    console.error("\n❌ Smoke test failed:");
    console.error(err);
    process.exit(1);
  }
}

run();
