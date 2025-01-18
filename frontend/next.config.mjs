/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*/",
          destination: process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/:path*/",
        },
        {
          source: "/media/:path*/",
          destination: process.env.NEXT_PUBLIC_API_SERVER_URL + "/media/:path*/",
        },
      ];
    },
    trailingSlash: true,
  };
  
  export default nextConfig;