# Usendua Website - Build and Deploy Instructions

## Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

## Build for Production

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Build Static Site
```bash
pnpm build
```

This will create an `out` folder with static HTML files.

### 3. Test Locally
```bash
# Install serve if you don't have it
npm install -g serve

# Serve the built files
serve out
```

## Deploy to BigStorage

### Option A: Using Cyberduck/S3 Browser
1. Connect to your BigStorage bucket (bold-thunder-5915)
2. Delete all existing files in the bucket
3. Upload ALL files from the `out` folder to the bucket root
4. Ensure files are set to public read access

### Option B: Using AWS CLI (if BigStorage supports it)
```bash
aws s3 sync out/ s3://bold-thunder-5915 --delete --acl public-read
```

## Deploy to Cloudflare Pages (Recommended)

### One-Time Setup
1. Go to Cloudflare Dashboard > Workers & Pages
2. Click "Create application" > "Pages" > "Connect to Git"
3. Connect your Git repository
4. Configure build settings:
   - Build command: `pnpm build`
   - Build output directory: `out`
   - Framework preset: Next.js (Static HTML Export)

### Automatic Deployments
After setup, every push to your main branch will automatically:
- Build the site
- Deploy to production
- Update your domain

## Domain Configuration

### If using BigStorage + Cloudflare Worker
- Ensure Cloudflare Worker routes are set:
  - `usenudua.com.ng/*` → `bigstorage-proxy` worker
  - `www.usenudua.com.ng/*` → `bigstorage-proxy` worker

### If using Cloudflare Pages
- Cloudflare Pages will automatically configure DNS
- Just add your custom domain in Pages settings

## Important Files to Upload
Make sure these files are in BigStorage public folder:
- ✅ `usenudua.apk` - Android app download
- ✅ All files from `out` folder

## Verification Checklist
After deployment, verify:
- [ ] Homepage loads: https://usenudua.com.ng
- [ ] Privacy Policy: https://usenudua.com.ng/privacy-policy
- [ ] Terms of Service: https://usenudua.com.ng/terms-of-service
- [ ] Data Deletion: https://usenudua.com.ng/data-deletion
- [ ] APK download works: https://usenudua.com.ng/usenudua.apk
- [ ] All images load correctly
- [ ] Mobile responsive design works
- [ ] Calendar is interactive

## Troubleshooting

### Build Errors
If you get TypeScript errors:
```bash
# The build will proceed despite TS errors due to ignoreBuildErrors: true
```

### 404 Errors
- Ensure all files from `out` folder are uploaded
- Check that file names match exactly (case-sensitive)
- Verify index.html is in the root

### Images Not Loading
- Check that images are in `out/images/` folder
- Verify public read permissions on BigStorage

### APK Not Downloading
- Ensure `usendua.apk` is in the public root folder of BigStorage
- Set file to public read access
- Test direct link: https://bold-thunder-5915.s3.bigstorage.io/usenudua.apk

## Contact
For issues, contact: boifiok@usenudua.com.ng
