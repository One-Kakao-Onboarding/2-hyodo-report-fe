import { apiClient, TokenStorage } from "./api"
import type { LoginResponse } from "@/types/api"

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Auth: {
        authorize: (params: {
          redirectUri: string
          state?: string
        }) => void
      }
    }
  }
}

// 카카오 SDK 초기화
export function initKakaoSdk(): void {
  if (typeof window === "undefined") return
  if (window.Kakao && !window.Kakao.isInitialized()) {
    const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY
    if (jsKey) {
      window.Kakao.init(jsKey)
      console.log("Kakao SDK initialized")
    }
  }
}

// 카카오 로그인 URL 생성 (카카오로 직접 리다이렉트)
export function getKakaoLoginUrl(role: "CHILD" | "PARENT" = "CHILD"): string {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  if (!REST_API_KEY || !REDIRECT_URI) {
    throw new Error("Kakao OAuth configuration is missing")
  }

  const kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize"
  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    state: role, // role을 state로 전달
  })

  return `${kakaoAuthUrl}?${params.toString()}`
}

// 카카오 로그인 처리
export async function handleKakaoLogin(
  code: string,
  role: "CHILD" | "PARENT" = "CHILD",
): Promise<LoginResponse | null> {
  try {
    const response = await apiClient.login({ code, role })

    if (response.success && response.data) {
      return response.data
    }

    console.error("Login failed:", response.error)
    return null
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

// 로그아웃
export async function logout(): Promise<void> {
  try {
    await apiClient.logout()
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    TokenStorage.clearTokens()
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
  return TokenStorage.getAccessToken() !== null
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  try {
    const response = await apiClient.getMe()
    if (response.success && response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// 사용자 정보를 로컬 스토리지에 저장
export function saveUserInfo(user: LoginResponse): void {
  if (typeof window === "undefined") return
  localStorage.setItem("user_info", JSON.stringify(user))
}

// 사용자 정보를 로컬 스토리지에서 가져오기
export function getUserInfo(): LoginResponse | null {
  if (typeof window === "undefined") return null
  const userInfo = localStorage.getItem("user_info")
  if (!userInfo) return null
  try {
    return JSON.parse(userInfo)
  } catch {
    return null
  }
}

// 사용자 정보 삭제
export function clearUserInfo(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("user_info")
}