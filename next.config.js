/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.google.com']
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
