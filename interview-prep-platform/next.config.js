/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for free hosting
  output: 'export',

  // Image optimization for static export
  images: {
    unoptimized: true,
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,

  // Ensure smooth animations with proper transpilation
  transpilePackages: ['framer-motion'],

  // Disable x-powered-by header
  poweredByHeader: false,

  // Generate clean URLs
  trailingSlash: true,
}

module.exports = nextConfig
