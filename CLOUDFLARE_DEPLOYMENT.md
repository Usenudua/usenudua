# Cloudflare Pages Deployment Guide (OpenNext Migration)

This guide explains how to host your **Usenudua** webpage on Cloudflare Pages.

## Step 1: Push to GitHub / GitLab
Make sure your latest code is uploaded to a git repository.

## Step 2: Create a Cloudflare Pages Project
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute** > **Workers & Pages**.
3. Click the blue **Create** button.
4. **IMPORTANT**: Click the **Pages** tab (top of the box).
5. Click **Connect to Git** and select your repository.

## Step 3: Configure Build Settings
During the setup, use the following settings:

- **Framework preset**: `None` (Select "None" or "Other" to avoid automatic overrides)
- **Build command**: `npm run pages:build`  <-- THIS MUST BE EXACT
- **Build output directory**: `.open-next/cloudflare`
- **Root directory**: `/` (If your files are in the main repo folder)

### ⚠️ IMPORTANT: Check your GitHub Structure
If the build says it "Cannot find 'app' directory", check your GitHub:
1. Is the `app` folder visible in the main view of your repository?
2. Is it at the same level as `package.json`?
3. If all your files are inside a folder (like `usenudua-webpage/app`), set the **Root directory** in Cloudflare to that folder name.

## Step 4: Compatibility Settings
In the Cloudflare Pages dashboard for your project:
1. Go to **Settings** > **Functions**.
2. Set the **Compatibility date** to `2024-09-23` (or newer).
3. Add the **Compatibility flag**: `nodejs_compat`.

---

### Troubleshooting
- **Local Build on Windows**: `npm run pages:build` may fail locally on Windows due to limitations in the Cloudflare adapter. This is normal and won't affect the build on Cloudflare's own servers.
- **Node version**: Ensure Cloudflare is using Node.js 18 or newer.
- **Dependency Conflict**: If you see an `ERESOLVE` error, make sure the `.npmrc` file is uploaded. It contains `legacy-peer-deps=true` which fixes the conflict between Next.js 16 and the Cloudflare adapter.
