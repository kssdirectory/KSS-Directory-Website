/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.kss.directory',
        port: ''
      },
      {
        hostname: "127.0.0.1"
      }
    ],
    minimumCacheTTL: 345600,
  }
}

module.exports = nextConfig
