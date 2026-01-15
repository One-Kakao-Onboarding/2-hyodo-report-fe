import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "효도시그널 - 부모님께 묻지 않아도 전해지는 진심",
  description: "AI가 카카오톡 대화를 분석해 부모님의 건강, 감정, 필요를 알려드리는 효도 리포트 서비스",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#FEE500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
        <script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
