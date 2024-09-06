/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '35.211.79.95',
        port: '8080'
      },
      {
        hostname: "127.0.0.1"
      }
    ],
    minimumCacheTTL: 300,
  }
}

module.exports = nextConfig
