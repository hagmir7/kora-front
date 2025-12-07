/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-media.beinsports.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jdwel.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets-us-01.kc-usercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.beinsports.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fifa.facepy.com",
        pathname: "/**",
      },

      // Allow localhost images (needed for dev)
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
