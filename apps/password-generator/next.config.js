/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cal/ui", "@cal/utils", "@cal/seo"],
};

module.exports = nextConfig;

