# Deployment Guide

This guide walks you through deploying the Interview Prep Platform to production.

## Prerequisites

Before deploying, ensure you have:

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account
- A [Vercel](https://vercel.com/) account
- A [Supabase](https://supabase.com/) account

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: interview-prep-platform
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Click "Create new project"

### 1.2 Get Your API Keys

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6...`
3. Save these for later

### 1.3 Set Up Database Tables (Optional)

If you want to use Supabase for data storage, run the following SQL in the SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_id UUID REFERENCES companies(id),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  author_id UUID REFERENCES profiles(id),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Question Categories junction table
CREATE TABLE question_categories (
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, category_id)
);

-- Solutions table
CREATE TABLE solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  time_complexity TEXT,
  space_complexity TEXT,
  author_id UUID REFERENCES profiles(id),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Questions are viewable by everyone" ON questions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert questions" ON questions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Solutions are viewable by everyone" ON solutions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert solutions" ON solutions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can manage own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);
```

### 1.4 Configure Authentication

1. Go to **Authentication** > **Providers**
2. Enable email/password authentication
3. (Optional) Enable OAuth providers:
   - Google
   - GitHub

## Step 2: Prepare Your Code

### 2.1 Create Environment File

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2.2 Build Locally

Test the build locally to ensure there are no errors:

```bash
npm run build
```

### 2.3 Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/interview-prep-platform.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com/) and sign in
2. Click "Add New..." > "Project"
3. Import your GitHub repository
4. Select "interview-prep-platform"

### 3.2 Configure Environment Variables

In the Vercel project settings, add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### 3.3 Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be available at `https://your-project.vercel.app`

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

### 4.2 Update DNS

Add the following DNS records:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.21.21 |

### 4.3 Update Supabase

If using OAuth, update redirect URLs in Supabase:

1. Go to **Authentication** > **URL Configuration**
2. Add your custom domain to **Site URL** and **Redirect URLs**

## Step 5: Post-Deployment

### 5.1 Test All Features

- [ ] Landing page loads correctly
- [ ] Login/Register works
- [ ] Questions page displays data
- [ ] Search and filters work
- [ ] Bookmarks save correctly
- [ ] Profile settings update
- [ ] Mobile responsive design

### 5.2 Set Up Monitoring

Consider adding:

- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io/) for error tracking
- [Plausible](https://plausible.io/) for privacy-friendly analytics

### 5.3 Configure Caching

Update `next.config.js` for optimal caching:

```javascript
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

## Troubleshooting

### Build Errors

**Issue**: `Module not found` errors

**Solution**: Ensure all dependencies are installed:
```bash
npm install
```

**Issue**: TypeScript errors

**Solution**: Check for type errors:
```bash
npm run lint
```

### Authentication Issues

**Issue**: OAuth redirect not working

**Solution**:
1. Check Supabase redirect URLs
2. Ensure domain is correctly configured
3. Check browser console for errors

### Database Issues

**Issue**: Data not loading

**Solution**:
1. Check Supabase connection
2. Verify RLS policies
3. Check browser network tab for API errors

## Step 6: PWA & Mobile Installation

This application is a Progressive Web App (PWA) that can be installed on mobile devices and desktops for a native app-like experience.

### 6.1 How Users Can Install the PWA

**On Android (Chrome):**
1. Visit your deployed site in Chrome
2. Tap the "Add to Home Screen" prompt that appears, OR
3. Tap the three-dot menu > "Install app" or "Add to Home screen"
4. The app will be added to the home screen with the Interview Prep icon

**On iOS (Safari):**
1. Visit your deployed site in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner

**On Desktop (Chrome/Edge):**
1. Visit your deployed site
2. Click the install icon in the address bar, OR
3. Click the three-dot menu > "Install Interview Prep"

### 6.2 PWA Features

- **Offline Support**: Basic pages are cached for offline viewing
- **Install Prompt**: Users are prompted to install the app on supported browsers
- **App-like Experience**: Runs in standalone mode without browser UI
- **Fast Loading**: Assets are cached for quick subsequent loads

### 6.3 Customizing PWA Icons

To use custom icons, replace the placeholder icons in `/public/icons/`:

```bash
# Required icon sizes
icon-72x72.png
icon-96x96.png
icon-128x128.png
icon-144x144.png
icon-152x152.png
icon-192x192.png
icon-384x384.png
icon-512x512.png
```

You can use tools like:
- [PWA Asset Generator](https://github.com/nickmessing/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Maskable.app](https://maskable.app/) for maskable icons

### 6.4 Testing PWA Features

1. Open Chrome DevTools (F12)
2. Go to Application > Manifest to verify manifest loading
3. Go to Application > Service Workers to verify SW registration
4. Use Lighthouse (Audits tab) to run PWA audit

## Step 7: Vercel Deployment Tips

### 7.1 Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` or `master` branch
- **Preview**: When you create a pull request

### 7.2 Environment Variable Scopes

Configure variables for different environments:

| Scope | Use Case |
|-------|----------|
| Production | Live site only |
| Preview | PR deployments |
| Development | Local `vercel dev` |

### 7.3 Build Settings

Recommended Vercel settings for this project:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 18.x or 20.x |

### 7.4 Optimizing Performance

Enable these Vercel features for better performance:

1. **Edge Functions**: For API routes (automatic with Next.js)
2. **Image Optimization**: Enable in project settings
3. **Analytics**: Enable Vercel Analytics for performance insights
4. **Speed Insights**: Track Core Web Vitals

### 7.5 CI/CD with GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## Support

For additional help:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [GitHub Issues](https://github.com/yourusername/interview-prep-platform/issues)
