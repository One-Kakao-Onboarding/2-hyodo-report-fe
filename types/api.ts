// API 공통 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string | null
  error: string | null
}

// 인증 관련 타입
export interface LoginRequest {
  code: string
  role: "CHILD" | "PARENT"
}

export interface TokenData {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface LoginResponse {
  userId: number
  email: string
  nickname: string
  profileImageUrl: string
  role: "CHILD" | "PARENT"
  token: TokenData
  isNewUser: boolean
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface UserInfo {
  userId: number
  email: string
  nickname: string
  profileImageUrl: string
  role: "CHILD" | "PARENT"
  createdAt: string
  updatedAt: string
}

// 가족 그룹 관련 타입
export interface FamilyMember {
  id: number
  userId: number
  userNickname: string
  userProfileImageUrl: string
  role: "CHILD" | "PARENT"
  nickname: string
  joinedAt: string
}

export interface Family {
  id: number
  name: string
  inviteCode: string
  members: FamilyMember[]
  createdAt: string
  updatedAt: string
}

export interface CreateFamilyRequest {
  name: string
  role: "CHILD" | "PARENT"
  nickname: string
}

export interface JoinFamilyRequest {
  inviteCode: string
  role: "CHILD" | "PARENT"
  nickname: string
}

// 대화 데이터 관련 타입
export interface Conversation {
  id: number
  familyId: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface ConversationMessage {
  senderId: number
  type: "TEXT" | "IMAGE"
  content?: string
  imageUrl?: string
  sentAt: string
}

export interface CreateConversationRequest {
  familyId: number
  name: string
}

export interface UploadMessagesRequest {
  conversationId: number
  messages: ConversationMessage[]
}

// 인사이트 관련 타입
export interface HealthInsight {
  id: number
  familyId: number
  keywords: string
  severity: number
  summary: string
  recommendation: string
  analyzedAt: string
  createdAt: string
}

export interface EmotionInsight {
  id: number
  familyId: number
  emotionType: string
  emotionScore: number
  description: string
  conversationTips: string
  analyzedAt: string
  createdAt: string
}

export interface NeedsInsight {
  id: number
  familyId: number
  category: string
  needDescription: string
  priority: number
  productSuggestions: string
  analyzedAt: string
  createdAt: string
}

// 주간 리포트 관련 타입
export interface ConversationTip {
  id: number
  content: string
  priority: number
  category: string
}

export interface WeeklyReportData {
  id: number
  familyId: number
  periodStart: string
  periodEnd: string
  summary: string
  healthSummary: string
  emotionSummary: string
  needsSummary: string
  conversationTips: ConversationTip[]
  generatedAt: string
  createdAt: string
}

// 긴급 알림 관련 타입
export interface Alert {
  id: number
  familyId: number
  alertType: "HEALTH_EMERGENCY" | "EMOTIONAL_CRISIS" | "LONG_SILENCE"
  title: string
  content: string
  severity: number
  detectedKeywords: string
  aiAnalysis: string
  acknowledged: boolean
  acknowledgedAt: string | null
  createdAt: string
}