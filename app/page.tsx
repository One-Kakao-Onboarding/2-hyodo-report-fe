"use client"

import { useState } from "react"
import { KakaoLogin } from "@/components/kakao-login"
import { KakaoFriendList } from "@/components/kakao-friend-list"
import { SeniorApproval } from "@/components/senior-approval"
import { HyodoReport } from "@/components/hyodo-report"
import { MemorialChat } from "@/components/memorial-chat"
import { PastReports } from "@/components/past-reports"
import { ReportDetail } from "@/components/report-detail"
import type { KakaoUser, ConnectedParent } from "@/types/chat"

// 샘플 데이터
const SAMPLE_PARENTS: ConnectedParent[] = [
  {
    id: "1",
    name: "김순자",
    relationship: "어머니",
    avatarUrl: "/elderly-korean-woman-warm-smile.jpg",
    lastActive: new Date(),
    isDeceased: false,
    isMemorialMode: false,
    speechPatterns: ["우리 아들/딸", "밥 잘 챙겨 먹고", "건강이 제일이야"],
    favoriteTopics: ["손주 이야기", "옛날 추억", "음식"],
    personality: "따뜻하고 자상한",
    syncStatus: "approved",
  },
]

export default function Home() {
  // 인증 상태
  const [kakaoUser, setKakaoUser] = useState<KakaoUser | null>(null)

  // 앱 상태
  const [view, setView] = useState<
    "list" | "report" | "memorial-chat" | "past-reports" | "report-detail" | "senior-approval"
  >("list")
  const [selectedParent, setSelectedParent] = useState<ConnectedParent | null>(null)
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)
  const [connectedParents, setConnectedParents] = useState<ConnectedParent[]>(SAMPLE_PARENTS)

  // 로그인 전
  if (!kakaoUser) {
    return <KakaoLogin onLogin={(user) => setKakaoUser(user)} />
  }

  // 어르신 승인 화면 (카톡 알림에서 들어온 경우)
  if (view === "senior-approval") {
    return (
      <SeniorApproval
        user={kakaoUser}
        onApprove={() => {
          setView("list")
          setConnectedParents((prev) => prev.map((p) => ({ ...p, syncStatus: "approved" as const })))
        }}
        onBack={() => setView("list")}
      />
    )
  }

  if (view === "report-detail" && selectedParent && selectedReportId) {
    return (
      <ReportDetail
        parent={selectedParent}
        reportId={selectedReportId}
        onBack={() => {
          setSelectedReportId(null)
          setView("past-reports")
        }}
      />
    )
  }

  // 지난 리포트 보기
  if (view === "past-reports" && selectedParent) {
    return (
      <PastReports
        parent={selectedParent}
        onBack={() => setView("report")}
        onViewReport={(reportId) => {
          setSelectedReportId(reportId)
          setView("report-detail")
        }}
      />
    )
  }

  // 추모 채팅
  if (view === "memorial-chat" && selectedParent) {
    return (
      <MemorialChat
        parent={selectedParent}
        onBack={() => setView("report")}
        onEndMemorial={(farewellMessage?: string) => {
          setConnectedParents((prev) =>
            prev.map((p) =>
              p.id === selectedParent.id
                ? {
                    ...p,
                    isMemorialMode: false,
                    isDeceased: true,
                    hasCompletedMemorial: true,
                    farewellMessage: farewellMessage,
                    farewellDate: new Date(),
                  }
                : p,
            ),
          )
          setSelectedParent(null)
          setView("list")
        }}
      />
    )
  }

  // 효도 리포트
  if (view === "report" && selectedParent) {
    return (
      <HyodoReport
        parent={selectedParent}
        onBack={() => {
          setView("list")
          setSelectedParent(null)
        }}
        onViewPastReports={() => setView("past-reports")}
        onStartMemorial={() => {
          setConnectedParents((prev) =>
            prev.map((p) => (p.id === selectedParent.id ? { ...p, isMemorialMode: true } : p)),
          )
          setSelectedParent({ ...selectedParent, isMemorialMode: true })
          setView("memorial-chat")
        }}
        onOpenMemorialChat={() => setView("memorial-chat")}
      />
    )
  }

  // 카카오톡 메인 (친구 목록 + 채팅 탭)
  return (
    <KakaoFriendList
      user={kakaoUser}
      connectedParents={connectedParents}
      onOpenReport={(parent) => {
        if (parent.syncStatus === "approved") {
          setSelectedParent(parent)
          setView("report")
        }
      }}
      onAddParent={(parent) => {
        setConnectedParents((prev) => [...prev, parent])
      }}
      onUpdateParent={(updatedParent) => {
        setConnectedParents((prev) => prev.map((p) => (p.id === updatedParent.id ? updatedParent : p)))
      }}
      onLogout={() => setKakaoUser(null)}
    />
  )
}
