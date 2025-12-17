const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cal/ui", "@cal/utils", "@cal/seo"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 성능 최적화를 위한 컴파일러 옵션
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // 실험적 기능: 최적화된 패키지 임포트
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
  },
};

module.exports = withNextIntl(nextConfig);

