/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'musical-blindly-cheetah.ngrok-free.app',
        port: ''
      },
      {
        hostname: "127.0.0.1"
      }
    ],
    minimumCacheTTL: 60,
  }
}

module.exports = nextConfig
