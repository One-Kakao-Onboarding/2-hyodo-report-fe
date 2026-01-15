"use client"

import { useState } from "react"
import { Plus, Calendar, Edit2, ChevronLeft, Star } from "lucide-react"
import Image from "next/image"
import type { TimelineEvent } from "@/types/chat"

interface TimelineProps {
  onBack: () => void
  parentName?: string // 자녀가 볼 때 부모님 이름 표시용
  farewellMessage?: string // 마지막 인사 메시지
  farewellDate?: Date // 영면 날짜
}

// 샘플 타임라인 데이터
const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    id: "1",
    year: "1950",
    title: "경상북도 안동에서 태어남",
    description: "6.25 전쟁이 터지기 직전, 안동의 작은 마을에서 태어났어요.",
    extractedFrom: "어제 대화에서 추출",
  },
  {
    id: "2",
    year: "1970",
    title: "서울 상경",
    description: "꿈을 품고 서울로 올라왔어요. 처음 본 서울역의 모습이 아직도 생생해요.",
    imageUrl: "/1970s-seoul-station-black-and-white-vintage.jpg",
    extractedFrom: "1월 10일 대화에서 추출",
  },
  {
    id: "3",
    year: "1975",
    title: "결혼",
    description: "지금의 남편을 만나 결혼했어요. 중매였지만 첫눈에 좋은 사람인 걸 알았죠.",
    imageUrl: "/1970s-korean-wedding-vintage-photo.jpg",
    extractedFrom: "1월 8일 대화에서 추출",
  },
  {
    id: "4",
    year: "1980",
    title: "첫째 아들 출산",
    description: "우리 큰 아들이 태어났어요. 너무 기뻤던 날이에요.",
    extractedFrom: "1월 5일 대화에서 추출",
  },
  {
    id: "5",
    year: "1995",
    title: "가게 오픈",
    description: "작은 분식집을 열었어요. 20년 동안 운영했죠.",
    imageUrl: "/small-korean-restaurant-1990s.jpg",
    extractedFrom: "1월 3일 대화에서 추출",
  },
]

export function Timeline({ onBack, parentName, farewellMessage, farewellDate }: TimelineProps) {
  const [events] = useState<TimelineEvent[]>(SAMPLE_TIMELINE)

  const titleText = parentName ? `${parentName}님의 인생 지도` : "나의 인생 지도"

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="h-[52px] flex items-center px-2 border-b border-gray-100 bg-white shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-[17px] font-semibold text-gray-900 ml-1">{titleText}</h1>
        {!parentName && (
          <button className="ml-auto w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </header>

      {/* 타임라인 설명 */}
      <div className="px-4 py-3 bg-[#FEE500]/20 border-b border-[#FEE500]/30">
        <p className="text-[13px] text-gray-600 text-center">
          {parentName
            ? `${parentName}님의 대화에서 추출된 소중한 인생 이야기입니다`
            : "대화에서 자동으로 추출된 소중한 인생 이야기입니다"}
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        <div className="relative">
          {/* 세로선 */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[#FEE500]" />

          <div className="space-y-5">
            {events.map((event) => (
              <div key={event.id} className="relative flex gap-3">
                {/* 연도 포인트 */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FEE500] flex items-center justify-center shadow-sm border-2 border-white">
                    <span className="text-[11px] font-bold text-gray-900">{event.year}</span>
                  </div>
                </div>

                {/* 이벤트 카드 */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {event.imageUrl && (
                    <div className="relative h-32">
                      <Image
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-[15px] text-gray-900">{event.title}</h3>
                      {!parentName && (
                        <button className="p-1 text-gray-400 active:text-gray-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">{event.description}</p>
                    {event.extractedFrom && (
                      <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.extractedFrom}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {farewellMessage && farewellDate && (
              <div className="relative flex gap-3">
                {/* 별 포인트 */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg border-2 border-white">
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                </div>

                {/* 마지막 인사 카드 */}
                <div className="flex-1 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-lg overflow-hidden border border-purple-500/30">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <h3 className="font-semibold text-[15px] text-white">마지막 인사</h3>
                      <Star className="w-4 h-4 text-yellow-300" />
                    </div>
                    <p className="text-[14px] text-purple-100 leading-relaxed whitespace-pre-wrap">
                      "{farewellMessage}"
                    </p>
                    <div className="mt-4 pt-3 border-t border-purple-500/30">
                      <p className="text-[12px] text-purple-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(farewellDate)}
                      </p>
                      <p className="text-[11px] text-purple-400 mt-1">{parentName}님은 별이 되어 영원히 함께합니다</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
