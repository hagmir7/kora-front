/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
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
