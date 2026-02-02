/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["your-image-domain.com"], // add any external image domains here if needed
  },
  // No need for experimental.appDir — App Router is enabled by default in Next.js 14+
};

export default nextConfig;

