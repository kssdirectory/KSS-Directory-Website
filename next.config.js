/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a23b-35-227-86-218.ngrok-free.app',
        port: ''
      },
    ],
  }
}

module.exports = nextConfig
