"use client"

import { useState } from "react"
import { ChevronLeft, Heart, Shield, Check, Loader2, AlertCircle } from "lucide-react"
import type { KakaoUser } from "@/types/chat"

interface SeniorApprovalProps {
  user: KakaoUser
  onApprove: () => void
  onBack: () => void
}

export function SeniorApproval({ user, onApprove, onBack }: SeniorApprovalProps) {
  const [step, setStep] = useState<"request" | "confirm" | "processing" | "complete">("request")

  // 자녀 요청 정보 (실제로는 서버에서 가져옴)
  const childRequest = {
    childName: "홍길동",
    childRelation: "아들",
    requestDate: new Date(),
  }

  if (step === "processing") {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
        <Loader2 className="w-16 h-16 text-[#FEE500] animate-spin mb-6" />
        <h2 className="text-[18px] font-bold text-gray-900 mb-2">승인 처리 중...</h2>
        <p className="text-[14px] text-gray-500 text-center">잠시만 기다려주세요</p>
      </div>
    )
  }

  if (step === "complete") {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">승인 완료!</h2>
        <p className="text-[15px] text-gray-500 text-center mb-8">
          이제 {childRequest.childName}님이 효도 리포트를
          <br />
          받아볼 수 있어요
        </p>
        <button
          onClick={onApprove}
          className="w-full bg-[#FEE500] text-gray-900 py-4 rounded-xl text-[16px] font-semibold"
        >
          확인
        </button>
      </div>
    )
  }

  if (step === "confirm") {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F6F6F6]">
        <header className="h-[52px] flex items-center px-2 bg-[#F6F6F6]">
          <button
            type="button"
            onClick={() => setStep("request")}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900">승인 확인</h1>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span className="text-[15px] font-semibold text-gray-900">승인 전 확인해주세요</span>
            </div>

            <div className="space-y-4 text-[14px] text-gray-600">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[12px] font-bold">1</span>
                </div>
                <p>
                  <b className="text-gray-900">{childRequest.childName}</b>님이 회원님의 카카오톡 대화 내역에 접근하게
                  됩니다.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[12px] font-bold">2</span>
                </div>
                <p>대화 내용은 AI가 분석하여 건강/감정 리포트로 요약됩니다.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[12px] font-bold">3</span>
                </div>
                <p>원본 대화 내용은 저장되지 않으며, 분석 후 즉시 삭제됩니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-green-800">안전한 데이터 처리</p>
                <p className="text-[13px] text-green-700 mt-1">
                  카카오와 함께 안전하게 데이터를 처리합니다. 언제든 승인을 취소할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => setStep("request")}
              className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl text-[15px] font-semibold"
            >
              취소
            </button>
            <button
              onClick={() => {
                setStep("processing")
                setTimeout(() => setStep("complete"), 1500)
              }}
              className="flex-1 bg-[#FEE500] text-gray-900 py-3.5 rounded-xl text-[15px] font-semibold"
            >
              승인하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 요청 화면
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F6F6F6]">
      <header className="h-[52px] flex items-center px-2 bg-[#F6F6F6]">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900">효도시그널</h1>
      </header>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* 카카오톡 메시지 스타일 */}
        <div className="bg-[#B2C7D9] rounded-2xl p-4 mb-4">
          <div className="flex gap-2.5">
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-gray-600 mb-1">효도시그널</p>
              <div className="bg-white rounded-2xl rounded-tl-none p-4">
                <p className="text-[15px] font-semibold text-gray-900 mb-2">자녀분이 효도 리포트를 요청했어요</p>
                <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
                  <b>{childRequest.childName}</b>({childRequest.childRelation})님이 회원님의 카카오톡 대화를 분석하여
                  건강 리포트를 받고 싶어해요.
                </p>

                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-[12px] text-gray-500 mb-1">승인하면 이런 정보를 받게 됩니다</p>
                  <ul className="text-[13px] text-gray-700 space-y-1">
                    <li>• 건강 관련 키워드 분석</li>
                    <li>• 감정 상태 변화 추이</li>
                    <li>• 대화 빈도 변화</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-[14px] font-medium"
                  >
                    거절
                  </button>
                  <button
                    onClick={() => setStep("confirm")}
                    className="flex-1 bg-[#FEE500] text-gray-900 py-3 rounded-lg text-[14px] font-semibold"
                  >
                    승인하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 안내 */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-[14px] font-semibold text-gray-900">안심하세요</span>
          </div>
          <ul className="text-[13px] text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>원본 대화 내용은 자녀에게 전달되지 않아요</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>AI가 요약한 건강/감정 정보만 전달돼요</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>언제든 설정에서 승인을 취소할 수 있어요</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
