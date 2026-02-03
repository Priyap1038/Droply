/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone', // Enable standalone output for Docker
  images: {
    domains: ["ik.imagekit.io"], // ImageKit domain for image optimization
  },
  // No need for experimental.appDir — App Router is enabled by default in Next.js 14+
};

export default nextConfig;

