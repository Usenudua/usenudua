#!/bin/bash
set -e

echo "=== 1. Rebuild OpenNext output ==="
export OPEN_NEXT_DEBUG=true
npx @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion
cp .open-next/worker.js .open-next/assets/_worker.js
cp -r .open-next/.build .open-next/cloudflare .open-next/middleware .open-next/server-functions .open-next/assets/
cp _routes.json .open-next/assets/

echo ""
echo "=== 2. Confirm updated file made it into the build output ==="
cat .open-next/assets/.well-known/assetlinks.json

echo ""
echo "=== 3. Deploy to production (usenudua project, main branch) ==="
npx wrangler pages deploy .open-next/assets --project-name=usenudua --branch=main --commit-dirty=true

echo ""
echo "=== 4. Wait briefly for propagation ==="
sleep 15

echo ""
echo "=== 5. Verify live ==="
curl -s -A "Mozilla/5.0" https://usenudua.com.ng/.well-known/assetlinks.json
echo ""
curl -sI -A "Mozilla/5.0" https://usenudua.com.ng/.well-known/assetlinks.json | head -5