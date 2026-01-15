export interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  imageUrl?: string
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  imageUrl?: string
  extractedFrom?: string // 어떤 대화에서 추출됐는지
}

export interface WeeklyReport {
  id: string
  weekStart: Date
  weekEnd: Date
  healthStatus: string
  interests: string[]
  conversationTopics: string[]
  suggestedActions: string[]
  emotionSummary: "positive" | "neutral" | "concerned"
}

export type ChatMode = "daily" | "memorial"

export interface UserProfile {
  id: string
  name: string
  avatarUrl?: string
  phone?: string
}

export interface BotCharacter {
  id: string
  name: string
  avatarUrl: string
  personality: string
  greeting: string
  isCustom?: boolean // 커스텀 캐릭터 여부 추가
}

export const DEFAULT_BOT_CHARACTERS: BotCharacter[] = [
  {
    id: "spring",
    name: "봄이",
    avatarUrl: "/spring-flower-avatar-cute.jpg",
    personality: "따뜻하고 다정한",
    greeting: "어르신, 안녕하세요!\n저는 '봄이'예요. 오늘 하루는 어떠셨어요?",
  },
  {
    id: "sunny",
    name: "해님이",
    avatarUrl: "/cute-sun-character-avatar.jpg",
    personality: "밝고 활발한",
    greeting: "안녕하세요! 저는 '해님이'예요.\n오늘도 좋은 하루 보내셨나요?",
  },
  {
    id: "grandma",
    name: "순이 할머니",
    avatarUrl: "/friendly-elderly-korean-grandmother-avatar-illustr.jpg",
    personality: "자상하고 푸근한",
    greeting: "어이구, 잘 왔어~\n할머니가 이야기 들어줄게. 오늘 뭐 했어?",
  },
  {
    id: "puppy",
    name: "복실이",
    avatarUrl: "/cute-fluffy-puppy-character-avatar.jpg",
    personality: "귀엽고 충직한",
    greeting: "멍멍! 반가워요!\n복실이가 이야기 들어드릴게요~",
  },
]

export const PERSONALITY_PRESETS = [
  "따뜻하고 다정한",
  "밝고 활발한",
  "자상하고 푸근한",
  "귀엽고 충직한",
  "차분하고 지적인",
  "유머러스하고 재미있는",
]

export interface MemorialPerson {
  id: string
  name: string
  relationship: string // 예: 어머니, 아버지, 할머니
  avatarUrl?: string
  personality?: string
  speechPatterns?: string[] // 자주 쓰던 말투
  memories?: string[] // 추출된 추억들
  isDeceased?: boolean // 돌아가셨는지 여부
}

export interface HyodoReportData {
  id: string
  weekStart: Date
  weekEnd: Date
  // 건강 시그널
  healthSignals: {
    keywords: string[]
    summary: string
    riskLevel: "low" | "medium" | "high"
  }
  // 감정 일기
  sentimentCloud: {
    positive: number
    negative: number
    neutral: number
    summary: string
    conversationChange: number // 대화량 변화 %
  }
  // 위시리스트 큐레이션
  needsHunter: {
    items: { need: string; suggestion: string; link?: string }[]
  }
  // 대화 가이드
  conversationKit: {
    topics: string[]
    recentPhotos: string[]
    suggestedQuestions: string[]
  }
  // 긴급 시그널
  emergencySignal?: {
    type: "health" | "emotion" | "silence"
    message: string
  }
}

export interface ConnectedParent {
  id: string
  name: string
  relationship: string
  avatarUrl?: string
  lastActive?: Date
  isDeceased: boolean
  isMemorialMode?: boolean // 추모 모드 활성화 여부
  hasCompletedMemorial?: boolean // 영면 완료 여부
  farewellMessage?: string // 마지막 인사 메시지
  farewellDate?: Date // 영면 날짜
  speechPatterns: string[]
  favoriteTopics: string[]
  personality: string
  syncStatus: "pending" | "approved" | "rejected"
  kakaoId?: string // 카카오톡 ID
}

export interface ConnectedChild {
  id: string
  name: string
  relationship: string // 아들, 딸, 손주 등
  avatarUrl?: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount?: number
}

export interface KakaoUser {
  id: string
  name: string
  avatarUrl?: string
  phone?: string
}
