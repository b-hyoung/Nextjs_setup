import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "훈아티스 | AI·XR·디지털트윈 실시간 콘텐츠 스튜디오",
  description:
    "훈아티스는 Unreal Engine 5 기반 AI·XR·디지털트윈·미디어아트 실시간 콘텐츠 제작 스튜디오입니다. 교육·문화·역사·축제 분야의 몰입형 경험을 만듭니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
