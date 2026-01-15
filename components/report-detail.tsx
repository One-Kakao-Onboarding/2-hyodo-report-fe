"use client"

import { ChevronLeft, Heart, MessageCircle, TrendingUp, TrendingDown, AlertCircle, Lightbulb } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ConnectedParent } from "@/types/chat"

interface ReportDetailProps {
  parent: ConnectedParent
  reportId: string
  onBack: () => void
}

interface DetailedReport {
  id: string
  weekStart: string
  weekEnd: string
  healthRisk: "low" | "medium" | "high"
  sentiment: "positive" | "neutral" | "concerned"
  highlights: string[]
  healthSignals: {
    type: "positive" | "warning" | "concern"
    message: string
  }[]
  emotionDiary: {
    date: string
    mood: string
    summary: string
  }[]
  conversationStats: {
    totalMessages: number
    avgPerDay: number
    trend: "up" | "down" | "stable"
    trendPercent: number
  }
  talkingTips: string[]
  wishlist: string[]
}

const SAMPLE_REPORTS: Record<string, DetailedReport> = {
  "1": {
    id: "1",
    weekStart: "1월 6일",
    weekEnd: "1월 12일",
    healthRisk: "medium",
    sentiment: "neutral",
    highlights: ["무릎 통증 언급", "대화량 15% 감소"],
    healthSignals: [
      { type: "warning", message: "무릎 통증을 3회 언급하셨습니다" },
      { type: "concern", message: "대화량이 지난주 대비 15% 감소했습니다" },
      { type: "positive", message: "수면 패턴은 규칙적으로 유지 중입니다" },
    ],
    emotionDiary: [
      { date: "1월 12일", mood: "😐", summary: "무릎이 쑤셔서 외출을 못했다고 하셨어요" },
      { date: "1월 10일", mood: "😊", summary: "손주 영상통화로 기분이 좋아지셨어요" },
      { date: "1월 8일", mood: "😟", summary: "친구분 건강 소식에 걱정되셨대요" },
    ],
    conversationStats: {
      totalMessages: 47,
      avgPerDay: 6.7,
      trend: "down",
      trendPercent: 15,
    },
    talkingTips: [
      "무릎 통증에 대해 병원 방문을 권유해보세요",
      "지난주 손주 영상통화가 기분 전환에 도움이 됐어요",
      "함께 산책할 수 있는지 여쭤보세요",
    ],
    wishlist: ["손주들과 설날에 만나고 싶다", "봄에 제주도 여행 가고 싶다"],
  },
  "2": {
    id: "2",
    weekStart: "12월 30일",
    weekEnd: "1월 5일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["손주 학예회 기대", "친구 모임 참여"],
    healthSignals: [
      { type: "positive", message: "활발한 외부 활동을 하셨습니다" },
      { type: "positive", message: "식사를 규칙적으로 하셨습니다" },
      { type: "positive", message: "긍정적인 대화가 많았습니다" },
    ],
    emotionDiary: [
      { date: "1월 5일", mood: "😊", summary: "손주 학예회 이야기로 들뜨셨어요" },
      { date: "1월 3일", mood: "😄", summary: "동창 모임 다녀오셔서 신나셨대요" },
      { date: "1월 1일", mood: "😊", summary: "새해 인사 나누며 행복해하셨어요" },
    ],
    conversationStats: {
      totalMessages: 72,
      avgPerDay: 10.3,
      trend: "up",
      trendPercent: 20,
    },
    talkingTips: [
      "손주 학예회 날짜를 함께 확인해보세요",
      "동창 모임 이야기를 더 여쭤보세요",
      "새해 계획에 대해 이야기 나눠보세요",
    ],
    wishlist: ["손주 학예회 꼭 가고 싶다", "올해는 건강검진 받고 싶다"],
  },
  "3": {
    id: "3",
    weekStart: "12월 23일",
    weekEnd: "12월 29일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["크리스마스 가족 모임", "기분 좋은 대화"],
    healthSignals: [
      { type: "positive", message: "가족과 함께하는 시간이 많았습니다" },
      { type: "positive", message: "식욕이 좋으셨습니다" },
    ],
    emotionDiary: [
      { date: "12월 25일", mood: "😄", summary: "온 가족이 모여서 너무 행복하셨대요" },
      { date: "12월 27일", mood: "😊", summary: "손주들 선물 포장하며 즐거워하셨어요" },
    ],
    conversationStats: {
      totalMessages: 85,
      avgPerDay: 12.1,
      trend: "up",
      trendPercent: 35,
    },
    talkingTips: ["크리스마스 사진을 함께 보며 추억을 나눠보세요"],
    wishlist: ["내년에도 온 가족이 모이면 좋겠다"],
  },
  "4": {
    id: "4",
    weekStart: "12월 16일",
    weekEnd: "12월 22일",
    healthRisk: "high",
    sentiment: "concerned",
    highlights: ["감기 증상 언급", "약국 방문"],
    healthSignals: [
      { type: "concern", message: "감기 증상을 호소하셨습니다" },
      { type: "warning", message: "식욕이 감소했습니다" },
      { type: "positive", message: "약을 잘 챙겨 드시고 계십니다" },
    ],
    emotionDiary: [
      { date: "12월 20일", mood: "😷", summary: "감기가 심해서 힘드셨대요" },
      { date: "12월 18일", mood: "😟", summary: "몸이 안 좋아서 우울하셨어요" },
    ],
    conversationStats: {
      totalMessages: 38,
      avgPerDay: 5.4,
      trend: "down",
      trendPercent: 25,
    },
    talkingTips: [
      "병원 방문을 권유해보세요",
      "따뜻한 음식을 보내드리는 건 어떨까요",
      "회복되면 하고 싶은 것을 여쭤보세요",
    ],
    wishlist: ["빨리 나아서 손주들 만나고 싶다"],
  },
  "5": {
    id: "5",
    weekStart: "12월 9일",
    weekEnd: "12월 15일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["등산 동호회 활동", "새 친구 사귐"],
    healthSignals: [
      { type: "positive", message: "활발한 신체 활동을 하셨습니다" },
      { type: "positive", message: "새로운 사회적 관계를 맺으셨습니다" },
    ],
    emotionDiary: [
      { date: "12월 14일", mood: "😄", summary: "등산 후 뿌듯해하셨어요" },
      { date: "12월 11일", mood: "😊", summary: "새 친구와 커피 마시며 즐거우셨대요" },
    ],
    conversationStats: {
      totalMessages: 65,
      avgPerDay: 9.3,
      trend: "up",
      trendPercent: 10,
    },
    talkingTips: ["등산 동호회 이야기를 더 여쭤보세요", "새 친구분에 대해 관심을 가져보세요"],
    wishlist: ["봄에는 더 높은 산에 가보고 싶다"],
  },
}

export function ReportDetail({ parent, reportId, onBack }: ReportDetailProps) {
  const report = SAMPLE_REPORTS[reportId] || SAMPLE_REPORTS["1"]

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case "high":
        return { bg: "bg-red-500", text: "text-white", label: "주의 필요" }
      case "medium":
        return { bg: "bg-amber-500", text: "text-white", label: "관심 필요" }
      default:
        return { bg: "bg-green-500", text: "text-white", label: "양호" }
    }
  }

  const getSignalStyle = (type: string) => {
    switch (type) {
      case "concern":
        return { bg: "bg-red-50", border: "border-red-200", icon: AlertCircle, iconColor: "text-red-500" }
      case "warning":
        return { bg: "bg-amber-50", border: "border-amber-200", icon: AlertCircle, iconColor: "text-amber-500" }
      default:
        return { bg: "bg-green-50", border: "border-green-200", icon: Heart, iconColor: "text-green-500" }
    }
  }

  const riskStyle = getRiskStyle(report.healthRisk)

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* 헤더 */}
      <header className="h-[52px] flex items-center px-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900">
          {report.weekStart} ~ {report.weekEnd}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* 요약 헤더 */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12 rounded-[16px]">
              <AvatarImage src={parent.avatarUrl || "/placeholder.svg"} className="rounded-[16px]" />
              <AvatarFallback className="bg-gray-100 rounded-[16px]">{parent.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-gray-900">{parent.name}님의 주간 리포트</p>
              <p className="text-[13px] text-gray-500">
                {report.weekStart} ~ {report.weekEnd}
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-full ${riskStyle.bg}`}>
              <span className={`text-[12px] font-semibold ${riskStyle.text}`}>{riskStyle.label}</span>
            </div>
          </div>
        </div>

        {/* 건강 시그널 */}
        <div className="p-4 bg-white mt-2">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            건강 시그널
          </h2>
          <div className="space-y-2">
            {report.healthSignals.map((signal, i) => {
              const style = getSignalStyle(signal.type)
              const IconComponent = style.icon
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${style.bg} border ${style.border}`}>
                  <IconComponent className={`w-5 h-5 ${style.iconColor} mt-0.5 flex-shrink-0`} />
                  <p className="text-[14px] text-gray-700">{signal.message}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 대화량 통계 */}
        <div className="p-4 bg-white mt-2">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            대화 통계
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[12px] text-gray-500 mb-1">총 대화량</p>
              <p className="text-[20px] font-bold text-gray-900">{report.conversationStats.totalMessages}건</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[12px] text-gray-500 mb-1">일 평균</p>
              <p className="text-[20px] font-bold text-gray-900">{report.conversationStats.avgPerDay}건</p>
            </div>
          </div>
          <div
            className={`mt-3 flex items-center gap-2 p-3 rounded-xl ${
              report.conversationStats.trend === "up" ? "bg-green-50" : "bg-amber-50"
            }`}
          >
            {report.conversationStats.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-amber-500" />
            )}
            <p className="text-[14px] text-gray-700">
              지난주 대비 {report.conversationStats.trendPercent}%{" "}
              {report.conversationStats.trend === "up" ? "증가" : "감소"}
            </p>
          </div>
        </div>

        {/* 감정 일기 */}
        <div className="p-4 bg-white mt-2">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3">감정 일기</h2>
          <div className="space-y-3">
            {report.emotionDiary.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-[24px]">{entry.mood}</span>
                <div className="flex-1">
                  <p className="text-[12px] text-gray-500 mb-1">{entry.date}</p>
                  <p className="text-[14px] text-gray-700">{entry.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 대화 TIP */}
        <div className="p-4 bg-white mt-2">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            이번 주 대화 TIP
          </h2>
          <div className="space-y-2">
            {report.talkingTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-xl">
                <span className="text-[14px]">💡</span>
                <p className="text-[14px] text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 위시리스트 */}
        {report.wishlist.length > 0 && (
          <div className="p-4 bg-white mt-2 mb-4">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">이루고 싶은 것</h2>
            <div className="space-y-2">
              {report.wishlist.map((wish, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 rounded-xl">
                  <span className="text-[14px]">🌟</span>
                  <p className="text-[14px] text-gray-700">{wish}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
