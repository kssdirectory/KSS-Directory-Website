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
    ],
  }
}

module.exports = nextConfig
