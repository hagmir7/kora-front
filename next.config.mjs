/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['prod-media.beinsports.com', 'jdwel.com', 'assets-us-01.kc-usercontent.com', 'www.beinsports.com'],
    unoptimized: true,
  },
};

export default nextConfig;
