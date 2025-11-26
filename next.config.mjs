/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },

      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'prod-media.beinsports.com',
      },
      {
        protocol: 'https',
        hostname: 'jdwel.com',
      },
      {
        protocol: 'https',
        hostname: 'assets-us-01.kc-usercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.beinsports.com',
      },
    ],
  },
};

export default nextConfig;
