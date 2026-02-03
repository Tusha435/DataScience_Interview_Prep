# Interview Prep Platform - Deployment Guide

A complete guide to deploy your Interview Prep Platform for **FREE** on Vercel with GitHub-based content management.

---

## Quick Start (5 Minutes)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Interview Prep Platform"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/interview-prep-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `interview-prep-platform` repository
4. Click **"Deploy"**

**Done!** Your app is live at `https://interview-prep-platform.vercel.app`

---

## How It Works

### Data Storage: GitHub as Your Free Database

Your questions are stored in `/data/questions.json`. This file is part of your codebase, meaning:

- **Free forever** - No database costs
- **Version controlled** - Full history of changes
- **Easy to edit** - Just update the JSON file
- **Auto-deploys** - Push changes to GitHub, Vercel rebuilds automatically

### Content Approval Workflow

When users submit new questions:

1. **User submits** → Creates a GitHub Issue with question details
2. **You review** → Check the GitHub Issue
3. **You approve** → Add question to `data/questions.json`
4. **You push** → Site auto-rebuilds with new content

---

## Managing Questions

### Adding a New Question

Edit `data/questions.json` and add a new entry:

```json
{
  "id": "q9",
  "title": "Your Question Title",
  "description": "Detailed problem description...",
  "company": "Google",
  "difficulty": "Medium",
  "categories": ["Arrays", "Dynamic Programming"],
  "tags": ["array", "dp", "optimization"],
  "solution": {
    "explanation": "Explain the approach...",
    "code": "function solve() { ... }",
    "language": "typescript",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)"
  },
  "author": "Your Name",
  "createdAt": "2024-01-20"
}
```

Then commit and push:

```bash
git add data/questions.json
git commit -m "Add: New question - Your Question Title"
git push
```

Vercel will automatically rebuild and deploy!

### Reviewing Submitted Questions

1. Go to your GitHub repo → **Issues** tab
2. Look for issues labeled `question-submission`
3. Review the question details
4. If approved:
   - Copy the question data
   - Add to `data/questions.json`
   - Commit and push
   - Close the issue with comment "Added to platform!"
5. If rejected:
   - Close the issue with feedback

---

## Environment Variables (Optional)

To enable the GitHub Issue submission feature, add these to Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_GITHUB_OWNER` | `your-username` | Your GitHub username |
| `NEXT_PUBLIC_GITHUB_REPO` | `interview-prep-platform` | Your repo name |

---

## Customization

### Adding Companies

Edit `data/questions.json` → `companies` array:

```json
"companies": ["Google", "Amazon", "Microsoft", "Your Company"]
```

### Adding Categories

Edit `data/questions.json` → `categories` array:

```json
"categories": ["Arrays", "Strings", "Trees", "Your Category"]
```

### Changing Theme Colors

Edit `src/app/globals.css` → CSS variables in `:root`

### Adding PWA Icons

1. Visit [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload `public/icons/icon.svg`
3. Download icons
4. Extract to `public/icons/`

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Test production build locally
npx serve out
```

---

## Project Structure

```
interview-prep-platform/
├── data/
│   └── questions.json      # Your questions database
├── public/
│   ├── icons/              # PWA icons
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
├── src/
│   ├── app/                # Next.js pages
│   ├── components/         # React components
│   ├── hooks/              # Custom hooks
│   └── lib/
│       └── data.ts         # Data loader
└── DEPLOY.md               # This file
```

---

## Free Tier Limits

### Vercel (Hosting)
- **Bandwidth**: 100GB/month (~50,000 visitors)
- **Builds**: Unlimited
- **Custom domains**: Yes
- **SSL**: Automatic

### GitHub (Data Storage)
- **Storage**: Unlimited for public repos
- **Requests**: Unlimited
- **Issues**: Unlimited

**Total Monthly Cost: $0**

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Animations Laggy

The app uses `framer-motion` with optimized animations. If you experience lag:

1. Reduce animation complexity in `src/components/common/Animations.tsx`
2. Use `will-change: transform` CSS for animated elements
3. Test on production build (dev mode is slower)

### Questions Not Updating

1. Make sure you pushed to the correct branch (`main`)
2. Check Vercel deployment status
3. Clear browser cache or use incognito mode

### PWA Not Installing

1. Site must be served over HTTPS (Vercel does this automatically)
2. Ensure `manifest.json` is accessible at `/manifest.json`
3. Check Chrome DevTools → Application → Manifest

---

## Mobile Installation

Your app is a PWA (Progressive Web App)! Users can install it:

### Android (Chrome)
1. Visit your site
2. Tap "Add to Home Screen" banner (or Menu → Install)

### iOS (Safari)
1. Visit your site
2. Tap Share → "Add to Home Screen"

### Desktop (Chrome/Edge)
1. Visit your site
2. Click install icon in address bar

---

## Auto-Deploy Workflow

```
You edit questions.json
        ↓
git add . && git commit -m "Add question" && git push
        ↓
GitHub receives push
        ↓
Vercel detects change → Rebuilds site
        ↓
New version live in ~60 seconds!
```

---

## Alternative Hosting (All Free)

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=out
```

### Cloudflare Pages
1. Connect GitHub repo at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Build command: `npm run build`
3. Output directory: `out`
4. **Bonus**: Unlimited bandwidth!

### GitHub Pages
1. Enable in repo Settings → Pages
2. Source: `main` branch, `/out` folder
3. Add `basePath: '/repo-name'` to `next.config.js`

---

## Need Help?

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)

---

## Summary

| What | Where | Cost |
|------|-------|------|
| **Hosting** | Vercel | $0 |
| **Database** | GitHub JSON | $0 |
| **CDN** | Vercel Edge | $0 |
| **SSL** | Automatic | $0 |
| **Domain** | yourapp.vercel.app | $0 |
| **Total** | | **$0/month** |

Your Interview Prep Platform is now live, mobile-friendly, and completely free to run! 🚀
