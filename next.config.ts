import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 배포: 전 페이지 정적 export
  output: "export",
  // export 모드에선 이미지 서버 최적화 불가 — 소스가 이미 webp 최적화본
  images: { unoptimized: true },
};

export default nextConfig;
