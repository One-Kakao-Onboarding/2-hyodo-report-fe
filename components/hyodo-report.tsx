"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Bell,
  Heart,
  TrendingUp,
  ShoppingBag,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Gift,
  ExternalLink,
  ChevronRight,
  Calendar,
  MessageCircle,
  MapPin,
  Navigation,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ConnectedParent, HyodoReportData } from "@/types/chat"

interface HyodoReportProps {
  parent: ConnectedParent
  onBack: () => void
  onViewPastReports: () => void
  onStartMemorial: () => void
  onOpenMemorialChat: () => void
}

const SAMPLE_REPORT: HyodoReportData = {
  id: "1",
  weekStart: new Date("2025-01-06"),
  weekEnd: new Date("2025-01-12"),
  healthSignals: {
    keywords: ["무릎", "계단", "파스"],
    summary: "최근 2주간 '무릎', '계단', '파스' 키워드를 5회 이상 언급하셨습니다. 정형외과 검진을 권유해보세요.",
    riskLevel: "medium",
  },
  sentimentCloud: {
    positive: 45,
    negative: 20,
    neutral: 35,
    summary: "최근 대화량이 15% 감소했으며, 단답형 응답이 늘어났습니다. 정서적 지지가 필요한 시기입니다.",
    conversationChange: -15,
  },
  needsHunter: {
    items: [
      { need: "밥맛이 예전 같지 않다", suggestion: "여름 보양식 세트", link: "#" },
      { need: "요즘 잠이 안 온다", suggestion: "숙면 유도 아이템", link: "#" },
      { need: "등산화가 낙았다", suggestion: "기능성 등산화", link: "#" },
    ],
  },
  conversationKit: {
    topics: ["며칠 전 올린 화단 사진", "친구분 김영자씨 이야기", "손주 학예회"],
    recentPhotos: ["/colorful-garden-flowers.png"],
    suggestedQuestions: [
      "꽃이 참 예쁘게 피었네요, 직접 심으신 거예요?",
      "김영자씨는 요즘 어떻게 지내세요?",
      "손주 학예회는 어땠어요?",
    ],
  },
}

const FREQUENT_KEYWORDS = [
  { keyword: "손주", count: 23, trend: "up" },
  { keyword: "병원", count: 18, trend: "same" },
  { keyword: "무릎", count: 15, trend: "up" },
  { keyword: "친구", count: 12, trend: "down" },
  { keyword: "날씨", count: 10, trend: "same" },
]

const NEARBY_HOSPITALS = [
  {
    id: "1",
    name: "서울정형외과의원",
    category: "정형외과",
    distance: "350m",
    address: "서울시 강남구 역삼동 123-45",
    rating: 4.5,
    kakaoMapUrl: "https://map.kakao.com",
  },
  {
    id: "2",
    name: "강남재활의학과",
    category: "재활의학과",
    distance: "520m",
    address: "서울시 강남구 역삼동 234-56",
    rating: 4.3,
    kakaoMapUrl: "https://map.kakao.com",
  },
  {
    id: "3",
    name: "역삼한방병원",
    category: "한의원",
    distance: "780m",
    address: "서울시 강남구 역삼동 345-67",
    rating: 4.7,
    kakaoMapUrl: "https://map.kakao.com",
  },
]

export function HyodoReport({
  parent,
  onBack,
  onViewPastReports,
  onStartMemorial,
  onOpenMemorialChat,
}: HyodoReportProps) {
  const [report] = useState<HyodoReportData>(SAMPLE_REPORT)
  const [showMemorialConfirm, setShowMemorialConfirm] = useState(false)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" }
      case "medium":
        return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" }
      default:
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" }
    }
  }

  const riskStyle = getRiskColor(report.healthSignals.riskLevel)

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      <header className="h-[52px] flex items-center px-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900">효도 리포트</h1>
        <div className="ml-auto">
          <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* 부모님 프로필 */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 rounded-[20px] border-2 border-red-200">
              <AvatarImage src={parent.avatarUrl || "/placeholder.svg"} className="rounded-[20px]" />
              <AvatarFallback className="bg-gray-100 text-lg rounded-[20px]">{parent.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-[17px] font-semibold text-gray-900">
                {parent.relationship} {parent.name}
              </h2>
              <p className="text-[13px] text-gray-500 mt-0.5">1월 6일 ~ 1월 12일 분석 결과</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* 건강 시그널 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">건강 시그널</h3>
            </div>
            <div className="p-4">
              <div className={`p-3 rounded-xl ${riskStyle.bg} border ${riskStyle.border} mb-3`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-4 h-4 ${riskStyle.text}`} />
                  <span className={`text-[12px] font-medium ${riskStyle.text}`}>
                    {report.healthSignals.riskLevel === "high"
                      ? "주의 필요"
                      : report.healthSignals.riskLevel === "medium"
                        ? "관심 필요"
                        : "양호"}
                  </span>
                </div>
                <p className="text-[13px] text-gray-900">{report.healthSignals.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {report.healthSignals.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="text-[12px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full border border-red-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">근처 추천 병원</h3>
              <span className="ml-auto text-[11px] text-gray-400">{parent.name}님 주소 기준</span>
            </div>
            <div className="p-3 space-y-2">
              {NEARBY_HOSPITALS.map((hospital) => (
                <a
                  key={hospital.id}
                  href={hospital.kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-gray-900 truncate">{hospital.name}</p>
                      <span className="text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
                        {hospital.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-gray-500">{hospital.distance}</span>
                      <span className="text-[12px] text-amber-500">★ {hospital.rating}</span>
                    </div>
                  </div>
                  <Navigation className="w-5 h-5 text-[#FEE500] shrink-0" />
                </a>
              ))}
              <a
                href="https://map.kakao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#FEE500] rounded-xl text-[14px] font-medium text-gray-900 active:bg-[#FEE500]/80"
              >
                <img src="/kakao-map-logo.jpg" alt="" className="w-5 h-5" />
                카카오맵에서 더 보기
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">자주 언급한 키워드</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2.5">
                {FREQUENT_KEYWORDS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[12px] text-gray-400 w-5">{i + 1}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center px-3"
                        style={{ width: `${(item.count / FREQUENT_KEYWORDS[0].count) * 100}%` }}
                      >
                        <span className="text-[13px] font-medium text-white whitespace-nowrap">{item.keyword}</span>
                      </div>
                    </div>
                    <span className="text-[13px] text-gray-500 w-10 text-right">{item.count}회</span>
                    <span className="w-5">
                      {item.trend === "up" && <TrendingUp className="w-4 h-4 text-red-500" />}
                      {item.trend === "down" && <TrendingUp className="w-4 h-4 text-blue-500 transform rotate-180" />}
                      {item.trend === "same" && <span className="text-[12px] text-gray-400">-</span>}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-gray-500 mt-3 text-center">최근 7일간 대화에서 추출한 키워드입니다</p>
            </div>
          </div>

          {/* 감정 일기 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">감정 일기</h3>
            </div>
            <div className="p-4">
              <div className="h-3 flex rounded-full overflow-hidden mb-3">
                <div className="bg-green-400" style={{ width: `${report.sentimentCloud.positive}%` }} />
                <div className="bg-gray-300" style={{ width: `${report.sentimentCloud.neutral}%` }} />
                <div className="bg-red-400" style={{ width: `${report.sentimentCloud.negative}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mb-3">
                <span>긍정 {report.sentimentCloud.positive}%</span>
                <span>중립 {report.sentimentCloud.neutral}%</span>
                <span>부정 {report.sentimentCloud.negative}%</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-[13px] text-gray-900">{report.sentimentCloud.summary}</p>
                <p className="text-[12px] text-blue-600 mt-1">
                  대화량 변화: {report.sentimentCloud.conversationChange > 0 ? "+" : ""}
                  {report.sentimentCloud.conversationChange}%
                </p>
              </div>
            </div>
          </div>

          {/* 위시리스트 큐레이션 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">위시리스트 큐레이션</h3>
            </div>
            <div className="p-4 space-y-2.5">
              {report.needsHunter.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-gray-500">"{item.need}"</p>
                    <p className="text-[13px] font-medium text-gray-900">{item.suggestion}</p>
                  </div>
                  <button className="p-2 bg-[#FEE500] rounded-full shrink-0 active:bg-[#FEE500]/80">
                    <ExternalLink className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              ))}
              <button className="w-full py-3 bg-[#FEE500] rounded-xl text-[14px] font-medium text-gray-900 flex items-center justify-center gap-2 active:bg-[#FEE500]/80">
                <ShoppingBag className="w-4 h-4" />
                카카오 선물하기로 보기
              </button>
            </div>
          </div>

          {/* 대화 가이드 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-[15px] font-semibold text-gray-900">오늘의 대화 가이드</h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[12px] text-gray-500">이렇게 말을 건네보세요</p>
              {report.conversationKit.suggestedQuestions.map((question, i) => (
                <div key={i} className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-[13px] text-gray-900">"{question}"</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onViewPastReports}
            className="w-full p-4 bg-white rounded-2xl border border-gray-200 text-left active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FEE500]/30 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">지난 효도리포트 모아보기</p>
                <p className="text-[13px] text-gray-500">이전 분석 기록을 확인하세요</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {/* 늘, 봄 모드 */}
          {parent.isMemorialMode ? (
            <button
              onClick={onOpenMemorialChat}
              className="w-full p-4 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl text-left active:opacity-90"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white flex items-center gap-2">
                    늘, 봄<span className="text-[10px] bg-purple-500/30 px-2 py-0.5 rounded-full">활성화됨</span>
                  </p>
                  <p className="text-[13px] text-purple-200">{parent.name}님과 대화하기</p>
                </div>
                <Heart className="w-5 h-5 text-purple-300" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => setShowMemorialConfirm(true)}
              className="w-full p-4 bg-white rounded-2xl text-left border border-gray-200 active:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">늘, 봄 모드</p>
                  <p className="text-[13px] text-gray-500">소중한 분과 영원히 대화하기</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* 늘봄 확인 모달 - 기존 유지 */}
      {showMemorialConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-[18px] font-bold text-center text-gray-900 mb-2">늘, 봄 모드를 설정하시겠어요?</h3>
              <p className="text-[14px] text-gray-500 text-center mb-4">
                {parent.name}님의 대화 기록을 바탕으로
                <br />
                AI가 말투와 성격을 학습하여
                <br />
                소중한 분과 계속 대화할 수 있습니다.
              </p>
              <div className="bg-purple-50 rounded-xl p-3 mb-4">
                <p className="text-[12px] text-purple-700 text-center">
                  이 기능은 소중한 분이 영면하신 후<br />
                  추억을 간직하기 위한 기능입니다.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => setShowMemorialConfirm(false)}
                className="flex-1 py-4 text-[15px] text-gray-500 font-medium border-r border-gray-200 active:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowMemorialConfirm(false)
                  onStartMemorial()
                }}
                className="flex-1 py-4 text-[15px] text-purple-600 font-semibold active:bg-purple-50"
              >
                설정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
