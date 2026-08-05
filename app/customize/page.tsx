import type { Metadata } from "next";
import HeroEditor from "@/components/hero-editor";

export const metadata: Metadata = {
  title: "히어로 이미지 편집 | 훈아티스",
  robots: { index: false },
};

export default function CustomizePage() {
  return <HeroEditor />;
}
