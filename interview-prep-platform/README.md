# Interview Prep Platform

A modern, production-ready interview preparation platform built with Next.js 14, TypeScript, and Tailwind CSS. Practice real interview questions from top tech companies and ace your next technical interview.

## Features

- **Real Interview Questions**: Browse thousands of questions from Google, Amazon, Microsoft, Meta, and 50+ top companies
- **Multiple Solutions**: Learn different approaches with detailed explanations and complexity analysis
- **Code Highlighting**: Beautiful syntax highlighting for multiple programming languages
- **Bookmarks**: Save questions for later review
- **User Dashboard**: Track your progress with personalized statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Authentication**: Secure user authentication with email/password and OAuth providers

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Code Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account (for production)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/interview-prep-platform.git
   cd interview-prep-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Dashboard pages
│   │   ├── dashboard/
│   │   ├── questions/
│   │   ├── bookmarks/
│   │   └── profile/
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   ├── questions/         # Question-related components
│   ├── solutions/         # Solution-related components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   └── common/            # Shared components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   └── supabase/          # Supabase client configuration
├── types/                 # TypeScript type definitions
└── context/               # React Context providers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

### Questions
- Browse questions by company, difficulty, or category
- Search and filter functionality
- Bookmark questions for later
- View detailed problem descriptions

### Solutions
- Multiple solutions per question
- Syntax-highlighted code blocks
- Time and space complexity analysis
- Upvote/downvote system
- Add your own solutions

### Dashboard
- Personal statistics
- Recent activity tracking
- Quick actions
- Bookmarked questions

### Profile
- Account settings
- Notification preferences
- Appearance customization

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | (Optional) Service role key for admin operations |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/interview-prep-platform)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting
- [Supabase](https://supabase.com/) for backend services
