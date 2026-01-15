"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { getKakaoLoginUrl } from "@/lib/auth"
import type { KakaoUser } from "@/types/chat"

interface KakaoLoginProps {
  onLogin: (user: KakaoUser) => void
}

export function KakaoLogin({ onLogin }: KakaoLoginProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleKakaoLogin = () => {
    setIsLoading(true)
    try {
      // 카카오 OAuth 로그인 페이지로 리다이렉트
      const loginUrl = getKakaoLoginUrl("CHILD")
      window.location.href = loginUrl
    } catch (error) {
      console.error("Kakao login error:", error)
      setIsLoading(false)
      alert("카카오 로그인 설정이 올바르지 않습니다.")
    }
  }

  return (
    <main className="min-h-screen bg-[#FEE500] flex flex-col">
      {/* 로고 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* 카카오톡 말풍선 로고 */}
        <div className="mb-4">
          <svg width="88" height="80" viewBox="0 0 88 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44 0C19.7 0 0 15.67 0 35C0 47.02 7.78 57.54 19.62 63.58L14.54 79.23C14.26 80.12 15.28 80.85 16.06 80.32L35.02 67.26C37.94 67.74 40.94 68 44 68C68.3 68 88 52.33 88 33C88 13.67 68.3 0 44 0Z"
              fill="#3C1E1E"
            />
          </svg>
        </div>
        <h1 className="text-[#3C1E1E] text-[24px] font-medium">카카오톡</h1>
      </div>

      {/* 버튼 영역 */}
      <div className="px-6 pb-12 space-y-3">
        <button
          onClick={handleKakaoLogin}
          disabled={isLoading}
          className="w-full bg-[#3C1E1E] text-white py-4 rounded-xl text-[15px] font-medium flex items-center justify-center gap-2 active:opacity-90 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              로그인 중...
            </>
          ) : (
            "카카오계정 로그인"
          )}
        </button>

        <button className="w-full text-[#3C1E1E] py-3 text-[13px] active:opacity-70">
          카카오계정 또는 비밀번호 찾기
        </button>
      </div>
    </main>
  )
}
