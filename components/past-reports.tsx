"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ConnectedParent } from "@/types/chat"

interface PastReportsProps {
  parent: ConnectedParent
  onBack: () => void
  onViewReport: (reportId: string) => void
}

interface PastReport {
  id: string
  weekStart: string
  weekEnd: string
  healthRisk: "low" | "medium" | "high"
  sentiment: "positive" | "neutral" | "concerned"
  highlights: string[]
}

const SAMPLE_PAST_REPORTS: PastReport[] = [
  {
    id: "1",
    weekStart: "1월 6일",
    weekEnd: "1월 12일",
    healthRisk: "medium",
    sentiment: "neutral",
    highlights: ["무릎 통증 언급", "대화량 15% 감소"],
  },
  {
    id: "2",
    weekStart: "12월 30일",
    weekEnd: "1월 5일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["손주 학예회 기대", "친구 모임 참여"],
  },
  {
    id: "3",
    weekStart: "12월 23일",
    weekEnd: "12월 29일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["크리스마스 가족 모임", "기분 좋은 대화"],
  },
  {
    id: "4",
    weekStart: "12월 16일",
    weekEnd: "12월 22일",
    healthRisk: "high",
    sentiment: "concerned",
    highlights: ["감기 증상 언급", "약국 방문"],
  },
  {
    id: "5",
    weekStart: "12월 9일",
    weekEnd: "12월 15일",
    healthRisk: "low",
    sentiment: "positive",
    highlights: ["등산 동호회 활동", "새 친구 사귐"],
  },
]

export function PastReports({ parent, onBack, onViewReport }: PastReportsProps) {
  const [reports] = useState<PastReport[]>(SAMPLE_PAST_REPORTS)

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case "high":
        return { bg: "bg-red-100", text: "text-red-600", label: "주의" }
      case "medium":
        return { bg: "bg-amber-100", text: "text-amber-600", label: "관심" }
      default:
        return { bg: "bg-green-100", text: "text-green-600", label: "양호" }
    }
  }

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case "concerned":
        return { icon: "😟", label: "걱정됨" }
      case "neutral":
        return { icon: "😐", label: "보통" }
      default:
        return { icon: "😊", label: "좋음" }
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* 헤더 */}
      <header className="h-[52px] flex items-center px-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900">지난 리포트</h1>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* 부모님 프로필 */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-[16px]">
              <AvatarImage src={parent.avatarUrl || "/placeholder.svg"} className="rounded-[16px]" />
              <AvatarFallback className="bg-gray-100 rounded-[16px]">{parent.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[15px] font-semibold text-gray-900">{parent.name}님의 리포트 기록</p>
              <p className="text-[13px] text-gray-500">총 {reports.length}개의 리포트</p>
            </div>
          </div>
        </div>

        {/* 리포트 목록 */}
        <div className="p-4 space-y-3">
          {reports.map((report) => {
            const riskStyle = getRiskStyle(report.healthRisk)
            const sentimentStyle = getSentimentStyle(report.sentiment)

            return (
              <button
                key={report.id}
                onClick={() => onViewReport(report.id)}
                className="w-full bg-white rounded-2xl border border-gray-200 p-4 text-left active:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-[14px] font-medium text-gray-900">
                      {report.weekStart} ~ {report.weekEnd}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${riskStyle.bg}`}>
                    <Heart className={`w-3 h-3 ${riskStyle.text}`} />
                    <span className={`text-[11px] font-medium ${riskStyle.text}`}>{riskStyle.label}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                    <span className="text-[12px]">{sentimentStyle.icon}</span>
                    <span className="text-[11px] font-medium text-gray-600">{sentimentStyle.label}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {report.highlights.map((highlight, i) => (
                    <span key={i} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
