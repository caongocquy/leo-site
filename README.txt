Leo Site — Upwork Promotional Artwork Pack

Contains:
- public/images/otp-input-kit-upwork.webp
- public/images/splash-view-upwork.webp
- scripts/install-upwork-artwork.mjs

Use from the root of your local leo-site checkout:
  unzip ~/Downloads/leo-site-upwork-artwork.zip -d .
  node scripts/install-upwork-artwork.mjs
  npm run build

Both images are promotional concepts (NOT actual app screenshots).
The script adds them to the existing ProjectGallery using kind: concept,
plus English/Vietnamese captions and accessible alt text.

After reviewing locally, commit and push:
  git add public/images src/content/projects scripts/install-upwork-artwork.mjs
  git commit -m "feat: add Upwork promotional artwork to RN project galleries"
  git push
