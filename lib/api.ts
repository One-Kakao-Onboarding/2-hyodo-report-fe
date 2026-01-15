import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  UserInfo,
  Family,
  CreateFamilyRequest,
  JoinFamilyRequest,
  WeeklyReportData,
  HealthInsight,
  EmotionInsight,
  NeedsInsight,
  Alert,
} from "@/types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// 토큰 저장소
class TokenStorage {
  private static readonly ACCESS_TOKEN_KEY = "access_token"
  private static readonly REFRESH_TOKEN_KEY = "refresh_token"

  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static setAccessToken(token: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static setRefreshToken(token: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  static clearTokens(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
  }
}

// API 클라이언트 클래스
class ApiClient {
  private baseURL: string
  private isRefreshing = false
  private refreshSubscribers: ((token: string) => void)[] = []

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const accessToken = TokenStorage.getAccessToken()

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (accessToken && !endpoint.includes("/auth/login") && !endpoint.includes("/auth/refresh")) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // 401 에러 시 토큰 갱신 시도
      if (response.status === 401 && !endpoint.includes("/auth/refresh")) {
        const newToken = await this.handleTokenRefresh()
        if (newToken) {
          // 토큰 갱신 성공 시 재시도
          headers["Authorization"] = `Bearer ${newToken}`
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          })
          return await retryResponse.json()
        }
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        data: null,
        message: null,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      }
    }
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (this.isRefreshing) {
      // 이미 갱신 중이면 대기
      return new Promise((resolve) => {
        this.refreshSubscribers.push((token: string) => {
          resolve(token)
        })
      })
    }

    this.isRefreshing = true

    try {
      const refreshToken = TokenStorage.getRefreshToken()
      if (!refreshToken) {
        throw new Error("Refresh token not found")
      }

      const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      const data: ApiResponse<LoginResponse> = await response.json()

      if (data.success && data.data) {
        const { accessToken, refreshToken: newRefreshToken } = data.data.token
        TokenStorage.setTokens(accessToken, newRefreshToken)

        // 대기 중인 요청들에게 새 토큰 전달
        this.refreshSubscribers.forEach((callback) => callback(accessToken))
        this.refreshSubscribers = []

        return accessToken
      }

      throw new Error("Token refresh failed")
    } catch (error) {
      console.error("Token refresh error:", error)
      TokenStorage.clearTokens()
      // 로그인 페이지로 리다이렉트
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
      return null
    } finally {
      this.isRefreshing = false
    }
  }

  // 인증 API
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data.token
      TokenStorage.setTokens(accessToken, refreshToken)
    }

    return response
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await this.request<null>("/api/auth/logout", {
      method: "POST",
    })

    TokenStorage.clearTokens()
    return response
  }

  async getMe(): Promise<ApiResponse<UserInfo>> {
    return this.request<UserInfo>("/api/auth/me")
  }

  // 가족 그룹 API
  async createFamily(data: CreateFamilyRequest): Promise<ApiResponse<Family>> {
    return this.request<Family>("/api/families", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async joinFamily(data: JoinFamilyRequest): Promise<ApiResponse<Family>> {
    return this.request<Family>("/api/families/join", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMyFamilies(): Promise<ApiResponse<Family[]>> {
    return this.request<Family[]>("/api/families/my")
  }

  async getFamily(familyId: number): Promise<ApiResponse<Family>> {
    return this.request<Family>(`/api/families/${familyId}`)
  }

  async leaveFamily(familyId: number): Promise<ApiResponse<null>> {
    return this.request<null>(`/api/families/${familyId}/leave`, {
      method: "DELETE",
    })
  }

  // 주간 리포트 API
  async generateReport(familyId: number): Promise<ApiResponse<WeeklyReportData>> {
    return this.request<WeeklyReportData>(`/api/reports/generate?familyId=${familyId}`, {
      method: "POST",
    })
  }

  async getLatestReport(familyId: number): Promise<ApiResponse<WeeklyReportData>> {
    return this.request<WeeklyReportData>(`/api/reports/latest?familyId=${familyId}`)
  }

  async getAllReports(familyId: number): Promise<ApiResponse<WeeklyReportData[]>> {
    return this.request<WeeklyReportData[]>(`/api/reports?familyId=${familyId}`)
  }

  // 인사이트 API
  async getHealthInsights(familyId: number, days: number = 7): Promise<ApiResponse<HealthInsight[]>> {
    return this.request<HealthInsight[]>(`/api/insights/health?familyId=${familyId}&days=${days}`)
  }

  async getEmotionInsights(
    familyId: number,
    days: number = 7,
  ): Promise<ApiResponse<EmotionInsight[]>> {
    return this.request<EmotionInsight[]>(`/api/insights/emotion?familyId=${familyId}&days=${days}`)
  }

  async getNeedsInsights(familyId: number, days: number = 7): Promise<ApiResponse<NeedsInsight[]>> {
    return this.request<NeedsInsight[]>(`/api/insights/needs?familyId=${familyId}&days=${days}`)
  }

  async getHighRiskHealthInsights(familyId: number): Promise<ApiResponse<HealthInsight[]>> {
    return this.request<HealthInsight[]>(`/api/insights/health/high-risk?familyId=${familyId}`)
  }

  // 긴급 알림 API
  async getUnacknowledgedAlerts(familyId: number): Promise<ApiResponse<Alert[]>> {
    return this.request<Alert[]>(`/api/alerts/unacknowledged?familyId=${familyId}`)
  }

  async acknowledgeAlert(alertId: number): Promise<ApiResponse<null>> {
    return this.request<null>(`/api/alerts/${alertId}/acknowledge`, {
      method: "POST",
    })
  }
}

// 싱글톤 인스턴스
const apiClient = new ApiClient(API_BASE_URL)

export { apiClient, TokenStorage }