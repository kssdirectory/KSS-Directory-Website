/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '0d3c-35-185-101-48.ngrok-free.app',
        port: ''
      },
    ],
  }
}

module.exports = nextConfig
