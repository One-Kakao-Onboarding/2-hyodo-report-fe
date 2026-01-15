"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { TokenStorage, saveUserInfo } from "@/lib/auth"

export default function AuthCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processCallback = async () => {
      // 백엔드에서 토큰과 사용자 정보를 쿼리 파라미터로 전달받음
      const accessToken = searchParams.get("accessToken")
      const refreshToken = searchParams.get("refreshToken")
      const errorParam = searchParams.get("error")

      if (errorParam) {
        setError("로그인에 실패했습니다.")
        setTimeout(() => router.push("/"), 2000)
        return
      }

      if (!accessToken || !refreshToken) {
        setError("인증 정보가 없습니다.")
        setTimeout(() => router.push("/"), 2000)
        return
      }

      try {
        // 토큰 저장
        TokenStorage.setTokens(accessToken, refreshToken)

        // 사용자 정보 가져오기
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            saveUserInfo({
              userId: result.data.userId,
              email: result.data.email,
              nickname: result.data.nickname,
              profileImageUrl: result.data.profileImageUrl,
              role: result.data.role,
              token: {
                accessToken,
                refreshToken,
                tokenType: "Bearer",
                expiresIn: 3600000,
              },
              isNewUser: false,
            })
            router.push("/")
          } else {
            throw new Error("사용자 정보를 가져올 수 없습니다.")
          }
        } else {
          throw new Error("사용자 정보를 가져올 수 없습니다.")
        }
      } catch (err) {
        console.error("Callback error:", err)
        setError("로그인 처리 중 오류가 발생했습니다.")
        setTimeout(() => router.push("/"), 2000)
      }
    }

    processCallback()
  }, [searchParams, router])

  return (
    <main className="min-h-screen bg-[#FEE500] flex flex-col items-center justify-center px-8">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
            <p className="text-[#3C1E1E] text-sm">잠시 후 로그인 페이지로 이동합니다...</p>
          </>
        ) : (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-[#3C1E1E] mx-auto mb-4" />
            <p className="text-[#3C1E1E] text-lg font-medium">로그인 처리 중...</p>
          </>
        )}
      </div>
    </main>
  )
}