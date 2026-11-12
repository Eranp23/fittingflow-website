#!/bin/bash
# Double-click to build the FittingFlow website for the TEST address test2.fittingflow.com
# and make an upload package for Plesk (Node.js). Nothing is uploaded or changed online.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$PATH"
pause() { echo; read -n 1 -s -r -p "Press any key to close this window."; echo; }

SITE="/Users/eranperetz/Documents/GitHub/fittingflow-website"
OUT_DIR="/Users/eranperetz/Documents/GitHub/Claude outputs"
STAGE="$(mktemp -d)/fittingflow-website"
ZIP="$OUT_DIR/fittingflow-website-test2.zip"
cd "$SITE" || { pause; exit 1; }

echo "==> Building for https://test2.fittingflow.com (app links: https://app-test.fittingflow.com)"
# Shell values override .env.local, so this build never uses the localhost address.
export NEXT_PUBLIC_SITE_URL="https://test2.fittingflow.com"
export NEXT_PUBLIC_APP_URL="https://app-test.fittingflow.com"
export NEXT_TELEMETRY_DISABLED=1
if ! npx next build; then
  echo; echo "BUILD FAILED. Nothing was packaged. Copy the red text above and send it to Claude."; pause; exit 1
fi

echo "==> Packaging"
mkdir -p "$STAGE"
cp -R .next/standalone/. "$STAGE/"
mkdir -p "$STAGE/.next"
cp -R .next/static "$STAGE/.next/static"
cp -R public "$STAGE/public"
# Secrets never go in the package; they are set in Plesk instead.
find "$STAGE" -maxdepth 1 -name ".env*" -delete
mkdir -p "$OUT_DIR"
rm -f "$ZIP"
(cd "$(dirname "$STAGE")" && zip -qr "$ZIP" "fittingflow-website")
echo
echo "PACKAGE READY: $ZIP"
echo "Size: $(du -h "$ZIP" | cut -f1)"
pause
