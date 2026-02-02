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

## Support

For additional help:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Issues](https://github.com/yourusername/interview-prep-platform/issues)
