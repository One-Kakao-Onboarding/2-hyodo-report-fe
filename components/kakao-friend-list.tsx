"use client"

import { useState } from "react"
import {
  Search,
  Settings,
  Music,
  ChevronLeft,
  MessageCircle,
  ChevronRight,
  Check,
  Clock,
  Loader2,
  Heart,
  X,
  Gift,
  Bell,
  Shield,
  AlertCircle,
  Phone,
  Bookmark,
  UserPlus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ConnectedParent, KakaoUser } from "@/types/chat"
import { Timeline } from "@/components/timeline"

interface IncomingHyodoRequest {
  id: string
  fromName: string
  fromAvatarUrl?: string
  relationship: string
  requestDate: Date
  status: "pending" | "approved" | "rejected"
}

interface KakaoFriend {
  id: string
  name: string
  avatarUrl?: string
  statusMessage?: string
  backgroundUrl?: string
  isParent?: boolean
  hyodoStatus?: "none" | "pending" | "approved"
}

interface ChatRoom {
  id: string
  name: string
  avatarUrl?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
  isGroupChat?: boolean
  isHyodoRequest?: boolean
  requestData?: IncomingHyodoRequest
}

interface KakaoFriendListProps {
  user: KakaoUser
  connectedParents: ConnectedParent[]
  onOpenReport: (parent: ConnectedParent) => void
  onAddParent: (parent: ConnectedParent) => void
  onUpdateParent: (parent: ConnectedParent) => void
  onLogout: () => void
}

const dummyFriends: KakaoFriend[] = [
  {
    id: "1",
    name: "김순자",
    avatarUrl: "/elderly-korean-woman.jpg",
    statusMessage: "오늘도 감사한 하루",
    backgroundUrl: "/korean-garden-flowers.jpg",
    isParent: true,
    hyodoStatus: "approved",
  },
  {
    id: "2",
    name: "김철수",
    avatarUrl: "/korean-man-60s.jpg",
    statusMessage: "건강이 최고",
    backgroundUrl: "/mountain-landscape-korea.jpg",
    isParent: true,
    hyodoStatus: "pending",
  },
  { id: "3", name: "박영희", avatarUrl: "/korean-woman-30s.jpg", statusMessage: "카페에서 커피 한잔" },
  { id: "4", name: "이민수", avatarUrl: "/korean-man-30s.jpg", statusMessage: "" },
  { id: "5", name: "정수진", avatarUrl: "/korean-woman-40s.jpg", statusMessage: "여행 중" },
  { id: "6", name: "최동훈", avatarUrl: "/korean-man-40s.jpg", statusMessage: "열심히 일하는 중" },
]

const dummyIncomingRequests: IncomingHyodoRequest[] = [
  {
    id: "req1",
    fromName: "홍길동",
    fromAvatarUrl: "/korean-man-30s.jpg",
    relationship: "아들",
    requestDate: new Date(),
    status: "pending",
  },
]

export function KakaoFriendList({
  user,
  connectedParents,
  onOpenReport,
  onAddParent,
  onUpdateParent,
  onLogout,
}: KakaoFriendListProps) {
  const [activeTab, setActiveTab] = useState<"friends" | "chats" | "shopping" | "more">("friends")
  const [friends, setFriends] = useState<KakaoFriend[]>(dummyFriends)
  const [showSettings, setShowSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const [selectedFriendForProfile, setSelectedFriendForProfile] = useState<KakaoFriend | null>(null)

  const [showHyodoSignalChat, setShowHyodoSignalChat] = useState(false)
  const [hyodoSignalStep, setHyodoSignalStep] = useState<"list" | "select" | "sending" | "sent">("list")
  const [selectedFriendForHyodo, setSelectedFriendForHyodo] = useState<KakaoFriend | null>(null)
  const [selectedRelation, setSelectedRelation] = useState("")

  const [showRequestChat, setShowRequestChat] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<IncomingHyodoRequest | null>(null)
  const [approvalStep, setApprovalStep] = useState<"chat" | "confirm" | "processing" | "complete">("chat")

  const [showMemoryTimeline, setShowMemoryTimeline] = useState(false)
  const [memoryParent, setMemoryParent] = useState<ConnectedParent | null>(null)
  const [incomingRequests, setIncomingRequests] = useState<IncomingHyodoRequest[]>(dummyIncomingRequests)

  const [showAddPlusFriend, setShowAddPlusFriend] = useState(false)
  const [addPlusFriendStep, setAddPlusFriendStep] = useState<"info" | "adding" | "complete">("info")
  const [isHyodoChannelAdded, setIsHyodoChannelAdded] = useState(true) // default true for demo

  const filteredFriends = friends.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const pendingRequests = incomingRequests.filter((r) => r.status === "pending")

  const hyodoFriends = filteredFriends.filter((f) => f.hyodoStatus === "approved")
  const regularFriends = filteredFriends.filter((f) => f.hyodoStatus !== "approved")

  const chatRooms: ChatRoom[] = [
    ...(pendingRequests.length > 0
      ? pendingRequests.map((req) => ({
          id: `hyodo-req-${req.id}`,
          name: "효도시그널",
          avatarUrl: "",
          lastMessage: `${req.fromName}님이 효도시그널을 요청했어요`,
          lastMessageTime: "방금",
          unreadCount: 1,
          isHyodoRequest: true,
          requestData: req,
        }))
      : []),
    {
      id: "hyodo-main",
      name: "효도시그널",
      avatarUrl: "",
      lastMessage: "효도시그널에 오신 것을 환영합니다",
      lastMessageTime: "토요일",
    },
    {
      id: "1",
      name: "김순자",
      avatarUrl: "/elderly-korean-woman.jpg",
      lastMessage: "밥은 먹었니?",
      lastMessageTime: "오후 2:30",
      unreadCount: 2,
    },
    {
      id: "family",
      name: "우리 가족",
      avatarUrl: "",
      lastMessage: "엄마: 주말에 다들 모이자",
      lastMessageTime: "오전 11:20",
      unreadCount: 5,
      isGroupChat: true,
    },
    {
      id: "2",
      name: "김철수",
      avatarUrl: "/korean-man-60s.jpg",
      lastMessage: "알겠다",
      lastMessageTime: "어제",
    },
    {
      id: "3",
      name: "박영희",
      avatarUrl: "/korean-woman-30s.jpg",
      lastMessage: "다음주에 만나!",
      lastMessageTime: "어제",
    },
  ]

  // 추억 타임라인
  if (showMemoryTimeline && memoryParent) {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
        <Timeline
          onBack={() => {
            setShowMemoryTimeline(false)
            setMemoryParent(null)
          }}
          parentName={memoryParent.name}
          farewellMessage={memoryParent.farewellMessage}
          farewellDate={memoryParent.farewellDate}
        />
      </div>
    )
  }

  if (showAddPlusFriend) {
    if (addPlusFriendStep === "complete") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-2">채널 추가 완료!</h2>
          <p className="text-[15px] text-gray-500 text-center mb-8">
            효도시그널 채널이 추가되었습니다.
            <br />
            이제 친구 목록에서 채널을 확인할 수 있어요.
          </p>
          <button
            onClick={() => {
              setIsHyodoChannelAdded(true)
              setShowAddPlusFriend(false)
              setAddPlusFriendStep("info")
            }}
            className="w-full bg-[#FEE500] text-gray-900 py-4 rounded-xl text-[16px] font-semibold"
          >
            확인
          </button>
        </div>
      )
    }

    if (addPlusFriendStep === "adding") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
          <Loader2 className="w-16 h-16 text-[#FEE500] animate-spin mb-6" />
          <h2 className="text-[18px] font-bold text-gray-900 mb-2">채널 추가 중...</h2>
          <p className="text-[14px] text-gray-500 text-center">잠시만 기다려주세요</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#FEE500]">
        <header className="h-[52px] flex items-center px-2">
          <button
            type="button"
            onClick={() => setShowAddPlusFriend(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center px-6 pt-8">
          <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mb-4 shadow-lg">
            <Heart className="w-12 h-12 text-white" fill="white" />
          </div>

          <h1 className="text-[24px] font-bold text-gray-900 mb-1">효도시그널</h1>
          <div className="flex items-center gap-1 mb-4">
            <span className="text-[13px] text-gray-600">공식 채널</span>
            <div className="w-4 h-4 bg-[#3B82F6] rounded-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <p className="text-[14px] text-gray-700 text-center mb-6 leading-relaxed">
            부모님의 카톡 대화를 AI가 분석해
            <br />
            건강/감정 리포트를 전달해드려요.
            <br />
            효도의 시작, 효도시그널
          </p>

          <div className="w-full bg-white/80 rounded-2xl p-4 mb-6">
            <p className="text-[13px] font-semibold text-gray-900 mb-3">주요 기능</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-[13px] text-gray-700">건강 시그널 분석</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[13px] text-gray-700">감정 상태 리포트</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-[13px] text-gray-700">위시리스트 큐레이션</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-[18px] font-bold text-gray-900">12.5만</p>
              <p className="text-[11px] text-gray-600">친구</p>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <p className="text-[18px] font-bold text-gray-900">4.8</p>
              <p className="text-[11px] text-gray-600">평점</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white">
          <button
            onClick={() => {
              setAddPlusFriendStep("adding")
              setTimeout(() => setAddPlusFriendStep("complete"), 1500)
            }}
            className="w-full bg-[#FEE500] text-gray-900 py-4 rounded-xl text-[16px] font-semibold flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            채널 추가
          </button>
        </div>
      </div>
    )
  }

  if (showRequestChat && selectedRequest) {
    // 승인 완료 화면
    if (approvalStep === "complete") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-2">승인 완료!</h2>
          <p className="text-[15px] text-gray-500 text-center mb-8">
            이제 {selectedRequest.fromName}님이 효도 리포트를
            <br />
            받아볼 수 있어요
          </p>
          <button
            onClick={() => {
              setIncomingRequests((prev) =>
                prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: "approved" as const } : r)),
              )
              setApprovalStep("chat")
              setSelectedRequest(null)
              setShowRequestChat(false)
            }}
            className="w-full bg-[#FEE500] text-gray-900 py-4 rounded-xl text-[16px] font-semibold"
          >
            확인
          </button>
        </div>
      )
    }

    // 승인 처리 중
    if (approvalStep === "processing") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white items-center justify-center p-6">
          <Loader2 className="w-16 h-16 text-[#FEE500] animate-spin mb-6" />
          <h2 className="text-[18px] font-bold text-gray-900 mb-2">승인 처리 중...</h2>
          <p className="text-[14px] text-gray-500 text-center">잠시만 기다려주세요</p>
        </div>
      )
    }

    // 최종 확인
    if (approvalStep === "confirm") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F6F6F6]">
          <header className="h-[52px] flex items-center px-2 bg-white border-b border-gray-100">
            <button
              type="button"
              onClick={() => setApprovalStep("chat")}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="flex-1 text-center text-[17px] font-semibold text-gray-900 pr-10">승인 확인</h1>
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
                    <b className="text-gray-900">{selectedRequest.fromName}</b>님이 회원님의 카카오톡 대화 내역에
                    접근하게 됩니다.
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
                onClick={() => setApprovalStep("chat")}
                className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl text-[15px] font-semibold"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setApprovalStep("processing")
                  setTimeout(() => setApprovalStep("complete"), 1500)
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

    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#B2C7D9]">
        <header className="h-[52px] flex items-center justify-between px-2 bg-[#92AAC0]">
          <button
            type="button"
            onClick={() => {
              setShowRequestChat(false)
              setSelectedRequest(null)
              setApprovalStep("chat")
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[17px] font-semibold text-white">효도시그널</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 카카오톡 메시지 스타일 */}
          <div className="flex gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex-1 max-w-[280px]">
              <p className="text-[12px] text-gray-600 mb-1">효도시그널</p>
              <div className="bg-white rounded-2xl rounded-tl-none p-4">
                <p className="text-[15px] font-semibold text-gray-900 mb-2">자녀분이 효도 리포트를 요청했어요</p>
                <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
                  <b>{selectedRequest.fromName}</b>({selectedRequest.relationship})님이 회원님의 카카오톡 대화 내용을
                  분석하여 건강 리포트를 받고 싶어해요.
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
                    onClick={() => {
                      setIncomingRequests((prev) =>
                        prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: "rejected" as const } : r)),
                      )
                      setShowRequestChat(false)
                      setSelectedRequest(null)
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-[14px] font-medium"
                  >
                    거절
                  </button>
                  <button
                    onClick={() => setApprovalStep("confirm")}
                    className="flex-1 bg-[#FEE500] text-gray-900 py-3 rounded-lg text-[14px] font-semibold"
                  >
                    승인하기
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">오전 10:30</p>
            </div>
          </div>

          {/* 추가 안내 메시지 */}
          <div className="flex gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex-1 max-w-[280px]">
              <div className="bg-white rounded-2xl rounded-tl-none p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-[13px] font-semibold text-gray-900">안심하세요</span>
                </div>
                <ul className="text-[12px] text-gray-600 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>원본 대화 내용은 자녀에게 전달되지 않아요</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>AI가 요약한 건강/감정 정보만 전달돼요</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>언제든 설정에서 승인을 취소할 수 있어요</span>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">오전 10:30</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showHyodoSignalChat) {
    // 전송 완료
    if (hyodoSignalStep === "sent" && selectedFriendForHyodo) {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#B2C7D9]">
          <header className="h-[52px] flex items-center justify-between px-2 bg-[#92AAC0]">
            <button
              type="button"
              onClick={() => {
                setShowHyodoSignalChat(false)
                setHyodoSignalStep("list")
                setSelectedFriendForHyodo(null)
                setSelectedRelation("")
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-[17px] font-semibold text-white">효도시그널</h1>
            <div className="w-10" />
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="flex-1 max-w-[280px]">
                <p className="text-[12px] text-gray-600 mb-1">효도시그널</p>
                <div className="bg-white rounded-2xl rounded-tl-none p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-[15px] font-semibold text-gray-900 text-center mb-2">요청을 보냈어요!</p>
                  <p className="text-[14px] text-gray-600 text-center mb-4">
                    {selectedFriendForHyodo.name}님이 승인하시면
                    <br />
                    효도 리포트를 받아보실 수 있어요
                  </p>

                  <div className="bg-[#F5F5F5] rounded-xl p-3">
                    <p className="text-[12px] text-gray-500 mb-2">{selectedFriendForHyodo.name}님에게 발송된 메시지</p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-[13px] text-gray-700">
                        {user.name}님이 {selectedRelation}의 안부가 궁금해요. 승인하시면 AI가 대화를 분석해 건강
                        리포트를 전달해드려요.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">방금</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <button
              onClick={() => {
                setFriends((prev) =>
                  prev.map((f) =>
                    f.id === selectedFriendForHyodo.id ? { ...f, isParent: true, hyodoStatus: "pending" as const } : f,
                  ),
                )
                onAddParent({
                  id: selectedFriendForHyodo.id,
                  name: selectedFriendForHyodo.name,
                  avatarUrl: selectedFriendForHyodo.avatarUrl,
                  relationship: selectedRelation,
                  isDeceased: false,
                  speechPatterns: [],
                  favoriteTopics: [],
                  personality: "따뜻한",
                  lastActive: new Date(),
                  syncStatus: "pending",
                })
                setShowHyodoSignalChat(false)
                setHyodoSignalStep("list")
                setSelectedFriendForHyodo(null)
                setSelectedRelation("")
              }}
              className="w-full bg-[#FEE500] text-gray-900 py-3.5 rounded-xl text-[15px] font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      )
    }

    // 전송 중
    if (hyodoSignalStep === "sending") {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#B2C7D9] items-center justify-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mb-6" />
          <h2 className="text-[18px] font-bold text-white mb-2">요청 전송 중...</h2>
          <p className="text-[14px] text-white/80 text-center">
            {selectedFriendForHyodo?.name}님에게 카카오톡 메시지를 보내고 있어요
          </p>
        </div>
      )
    }

    // 친구 선택 화면
    if (hyodoSignalStep === "select" && selectedFriendForHyodo) {
      return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#B2C7D9]">
          <header className="h-[52px] flex items-center justify-between px-2 bg-[#92AAC0]">
            <button
              type="button"
              onClick={() => {
                setHyodoSignalStep("list")
                setSelectedFriendForHyodo(null)
                setSelectedRelation("")
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-[17px] font-semibold text-white">효도시그널</h1>
            <div className="w-10" />
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="flex-1 max-w-[280px]">
                <p className="text-[12px] text-gray-600 mb-1">효도시그널</p>
                <div className="bg-white rounded-2xl rounded-tl-none p-4">
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="w-16 h-16 rounded-[20px]">
                      <AvatarImage
                        src={selectedFriendForHyodo.avatarUrl || "/placeholder.svg"}
                        className="rounded-[20px]"
                      />
                      <AvatarFallback className="bg-gray-200 rounded-[20px] text-xl">
                        {selectedFriendForHyodo.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-[16px] font-semibold text-gray-900 mt-2">{selectedFriendForHyodo.name}</p>
                  </div>

                  <p className="text-[14px] text-gray-700 mb-3">
                    {selectedFriendForHyodo.name}님과의 관계를 선택해주세요
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {["어머니", "아버지", "할머니", "할아버지"].map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setSelectedRelation(rel)}
                        className={`py-2.5 rounded-lg text-[14px] transition-colors ${
                          selectedRelation === rel
                            ? "bg-[#FEE500] text-gray-900 font-medium"
                            : "bg-[#F6F6F6] text-gray-700"
                        }`}
                      >
                        {rel}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (selectedRelation) {
                        setHyodoSignalStep("sending")
                        setTimeout(() => setHyodoSignalStep("sent"), 1500)
                      }
                    }}
                    disabled={!selectedRelation}
                    className="w-full bg-[#FEE500] text-gray-900 py-3 rounded-lg text-[14px] font-semibold disabled:opacity-40"
                  >
                    요청 보내기
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">방금</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#B2C7D9]">
        <header className="h-[52px] flex items-center justify-between px-2 bg-[#92AAC0]">
          <button
            type="button"
            onClick={() => setShowHyodoSignalChat(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[17px] font-semibold text-white">효도시그널</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 환영 메시지 */}
          <div className="flex gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex-1 max-w-[280px]">
              <p className="text-[12px] text-gray-600 mb-1">효도시그널</p>
              <div className="bg-white rounded-2xl rounded-tl-none p-4">
                <p className="text-[15px] font-semibold text-gray-900 mb-2">효도시그널에 오신 것을 환영합니다!</p>
                <p className="text-[14px] text-gray-600 mb-4">
                  부모님의 카카오톡 대화를 AI가 분석하여 건강 상태와 감정을 리포트로 알려드려요.
                </p>
                <div className="bg-[#FFF9E6] rounded-xl p-3 mb-3">
                  <p className="text-[13px] text-gray-700">아래 친구 목록에서 효도시그널을 신청할 분을 선택해주세요.</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">오전 10:00</p>
            </div>
          </div>

          {/* 친구 목록 카드 */}
          <div className="flex gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex-1 max-w-[280px]">
              <div className="bg-white rounded-2xl rounded-tl-none p-4">
                <p className="text-[14px] font-medium text-gray-900 mb-3">친구 목록</p>
                <div className="space-y-2">
                  {friends
                    .filter((f) => !f.hyodoStatus || f.hyodoStatus === "none")
                    .map((friend) => (
                      <button
                        key={friend.id}
                        onClick={() => {
                          setSelectedFriendForHyodo(friend)
                          setHyodoSignalStep("select")
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-xl active:bg-gray-50 border border-gray-100"
                      >
                        <Avatar className="w-10 h-10 rounded-[12px]">
                          <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} className="rounded-[12px]" />
                          <AvatarFallback className="bg-gray-200 rounded-[12px]">
                            {friend.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="text-[14px] font-medium text-gray-900">{friend.name}</p>
                          {friend.statusMessage && (
                            <p className="text-[12px] text-gray-500 truncate">{friend.statusMessage}</p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                </div>

                {/* 이미 신청한 친구 */}
                {friends.filter((f) => f.hyodoStatus === "pending").length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[13px] text-gray-500 mb-2">승인 대기 중</p>
                    {friends
                      .filter((f) => f.hyodoStatus === "pending")
                      .map((friend) => (
                        <div key={friend.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                          <Avatar className="w-10 h-10 rounded-[12px]">
                            <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} className="rounded-[12px]" />
                            <AvatarFallback className="bg-gray-200 rounded-[12px]">
                              {friend.name.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left">
                            <p className="text-[14px] font-medium text-gray-900">{friend.name}</p>
                          </div>
                          <span className="text-[12px] text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            대기중
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">방금</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedFriendForProfile) {
    const connectedParent = connectedParents.find((p) => p.id === selectedFriendForProfile.id)
    const hasCompletedMemorial = connectedParent?.hasCompletedMemorial
    const isHyodoConnected = selectedFriendForProfile.hyodoStatus === "approved"

    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900">
        {/* 배경 이미지 */}
        <div className="relative h-[45%] bg-gradient-to-b from-gray-700 to-gray-900">
          <img
            src={
              selectedFriendForProfile.backgroundUrl || "/placeholder.svg?height=300&width=400&query=nature landscape"
            }
            alt=""
            className="w-full h-full object-cover opacity-60"
          />

          {/* 헤더 */}
          <div className="absolute top-0 left-0 right-0 h-[52px] flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setSelectedFriendForProfile(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10">
                <Gift className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10">
                <Bookmark className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
            <Avatar
              className={`w-24 h-24 rounded-full border-4 border-white/20 ${hasCompletedMemorial ? "opacity-70 grayscale" : ""}`}
            >
              <AvatarImage src={selectedFriendForProfile.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-300 text-2xl">
                {selectedFriendForProfile.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-[22px] font-semibold text-white mt-3">
              {selectedFriendForProfile.name}
              {hasCompletedMemorial && " 🌸"}
            </h2>
            {selectedFriendForProfile.statusMessage && (
              <p className="text-[14px] text-white/70 mt-1">{selectedFriendForProfile.statusMessage}</p>
            )}
            {hasCompletedMemorial && <p className="text-[13px] text-purple-300 mt-1">영원히 기억합니다</p>}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center gap-6 pb-8">
          {/* 기본 버튼들 */}
          <div className="flex items-center gap-12">
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-[12px] text-white">1:1 채팅</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-[12px] text-white">통화</span>
            </button>
          </div>

          {/* 효도시그널 버튼 */}
          {hasCompletedMemorial ? (
            <button
              onClick={() => {
                if (connectedParent) {
                  setMemoryParent(connectedParent)
                  setShowMemoryTimeline(true)
                  setSelectedFriendForProfile(null)
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-full"
            >
              <span className="text-[14px]">🌸</span>
              <span className="text-[14px] font-medium text-white">추억 보기</span>
            </button>
          ) : isHyodoConnected && connectedParent ? (
            <button
              onClick={() => {
                onOpenReport(connectedParent)
                setSelectedFriendForProfile(null)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full"
            >
              <Heart className="w-4 h-4 text-white" fill="white" />
              <span className="text-[14px] font-medium text-white">효도 리포트 보기</span>
            </button>
          ) : selectedFriendForProfile.hyodoStatus === "pending" ? (
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-full">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-[14px] text-gray-400">효도시그널 승인 대기 중</span>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  // 설정 화면
  if (showSettings) {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F6F6F6]">
        <header className="h-[52px] flex items-center px-2 bg-white border-b border-gray-100">
          <button
            type="button"
            onClick={() => setShowSettings(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-semibold text-gray-900 pr-10">설정</h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="bg-white mx-4 mt-4 rounded-xl overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="w-14 h-14 rounded-full">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-200 text-lg">{user.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
                <p className="text-[13px] text-gray-500">{user.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white mx-4 mt-3 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-[13px] font-medium text-gray-500">알림</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-gray-900">주간 리포트 알림</span>
                <div className="w-[51px] h-[31px] bg-[#34C759] rounded-full relative cursor-pointer">
                  <div className="absolute right-[2px] top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white mx-4 mt-3 rounded-xl overflow-hidden">
            <button onClick={onLogout} className="w-full p-4 text-red-500 text-[15px] text-center">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Updated renderFriendsTab to include channel in friend list
  const renderFriendsTab = () => (
    <div className="flex-1 overflow-y-auto">
      {/* 내 프로필 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14 rounded-[18px]">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} className="rounded-[18px]" />
            <AvatarFallback className="bg-gray-200 rounded-[18px]">{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
            <p className="text-[13px] text-gray-500">{user.statusMessage || "상태메시지를 입력해주세요"}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-[12px] text-gray-500">채널</span>
          {!isHyodoChannelAdded && (
            <button onClick={() => setShowAddPlusFriend(true)} className="text-[12px] text-blue-500 font-medium">
              채널 추가
            </button>
          )}
        </div>
        {isHyodoChannelAdded && (
          <div
            onClick={() => setShowHyodoSignalChat(true)}
            className="flex items-center gap-3 px-4 py-2.5 active:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="text-[15px] font-medium text-gray-900">효도시그널</p>
                <div className="w-3.5 h-3.5 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" />
                </div>
              </div>
              <p className="text-[13px] text-gray-500">효도의 시작</p>
            </div>
          </div>
        )}
      </div>

      {/* 효도시그널 연결된 친구 섹션 */}
      {hyodoFriends.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-4 py-2">
            <span className="text-[12px] text-gray-500">효도시그널 연결</span>
          </div>
          {hyodoFriends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => setSelectedFriendForProfile(friend)}
              className="flex items-center gap-3 px-4 py-2.5 active:bg-gray-50 cursor-pointer"
            >
              <div className="relative">
                <Avatar className="w-12 h-12 rounded-[16px]">
                  <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} className="rounded-[16px]" />
                  <AvatarFallback className="bg-gray-200 rounded-[16px]">{friend.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-full flex items-center justify-center border-2 border-white">
                  <Heart className="w-2.5 h-2.5 text-white" fill="white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium text-gray-900">{friend.name}</p>
                <p className="text-[13px] text-gray-500">{friend.statusMessage || ""}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 일반 친구 목록 */}
      <div>
        <div className="px-4 py-2">
          <span className="text-[12px] text-gray-500">친구 {regularFriends.length}</span>
        </div>
        {regularFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => setSelectedFriendForProfile(friend)}
            className="flex items-center gap-3 px-4 py-2.5 active:bg-gray-50 cursor-pointer"
          >
            <Avatar className="w-12 h-12 rounded-[16px]">
              <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} className="rounded-[16px]" />
              <AvatarFallback className="bg-gray-200 rounded-[16px]">{friend.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-[15px] font-medium text-gray-900">{friend.name}</p>
              <p className="text-[13px] text-gray-500">{friend.statusMessage || ""}</p>
            </div>
            {friend.hyodoStatus === "pending" && (
              <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full">승인대기</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderChatsTab = () => (
    <div className="flex-1 overflow-y-auto">
      {chatRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => {
            if (room.isHyodoRequest && room.requestData) {
              setSelectedRequest(room.requestData)
              setShowRequestChat(true)
            } else if (room.id === "hyodo-main") {
              setShowHyodoSignalChat(true)
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50"
        >
          <div className="relative">
            {room.id === "hyodo-main" || room.isHyodoRequest ? (
              <div className="w-[52px] h-[52px] rounded-[18px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
            ) : room.isGroupChat ? (
              <div className="w-[52px] h-[52px] rounded-[18px] bg-[#A0D2DB] flex items-center justify-center">
                <span className="text-white text-[18px] font-medium">3</span>
              </div>
            ) : (
              <Avatar className="w-[52px] h-[52px] rounded-[18px]">
                <AvatarImage src={room.avatarUrl || "/placeholder.svg"} className="rounded-[18px]" />
                <AvatarFallback className="bg-gray-200 rounded-[18px] text-[18px]">
                  {room.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <p className="text-[15px] font-medium text-gray-900">{room.name}</p>
                {(room.id === "hyodo-main" || room.isHyodoRequest) && (
                  <span className="text-[10px] bg-[#FEE500] text-gray-900 px-1 py-0.5 rounded font-medium">채널</span>
                )}
              </div>
              <span className="text-[11px] text-gray-400">{room.lastMessageTime}</span>
            </div>
            <p className="text-[13px] text-gray-500 truncate">{room.lastMessage}</p>
          </div>
          {room.unreadCount && (
            <div className="min-w-[20px] h-[20px] bg-[#FF3B30] rounded-full flex items-center justify-center px-1.5">
              <span className="text-[11px] text-white font-medium">{room.unreadCount}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  )

  // 쇼핑 탭
  const renderShoppingTab = () => (
    <div className="flex-1 overflow-y-auto bg-[#F6F6F6]">
      <div className="bg-white px-4 py-3 flex items-center gap-3 overflow-x-auto border-b border-gray-100">
        <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-[13px] font-medium whitespace-nowrap">
          홈
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-[13px] whitespace-nowrap">
          랭킹
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-[13px] whitespace-nowrap flex items-center gap-1">
          포미위크
          <span className="text-[10px] bg-red-500 text-white px-1 rounded">더블할인</span>
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-[13px] whitespace-nowrap">
          톡딜 첫구매
        </button>
      </div>

      <div className="bg-[#FEE500] mx-4 mt-3 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-gray-900" />
            <span className="text-[14px] font-medium text-gray-900">효도 선물하기</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </div>
        <p className="text-[13px] text-gray-700 mt-1">부모님께 마음을 전해보세요</p>
      </div>

      <div className="bg-white mx-4 mt-3 rounded-xl p-4">
        <div className="grid grid-cols-5 gap-4">
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="text-[11px] text-gray-700">선물하기</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-[14px]">%</span>
            </div>
            <span className="text-[11px] text-gray-700">톡딜</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-[14px]">M</span>
            </div>
            <span className="text-[11px] text-gray-700">메이커스</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">LIVE</span>
            </div>
            <span className="text-[11px] text-gray-700">라이브쇼핑</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center">
              <span className="text-[20px]">🐻</span>
            </div>
            <span className="text-[11px] text-gray-700">프렌즈</span>
          </button>
        </div>
      </div>

      <div className="bg-white mx-4 mt-3 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button className="flex-1 py-3 text-[14px] font-medium text-gray-900 border-b-2 border-gray-900">
            받은 선물
          </button>
          <button className="flex-1 py-3 text-[14px] text-gray-400">주문 내역</button>
          <button className="flex-1 py-3 text-[14px] text-gray-400">최근 본</button>
          <button className="flex-1 py-3 text-[14px] text-gray-400">찜한 상품</button>
        </div>
        <div className="p-8 text-center">
          <p className="text-[14px] text-gray-400">받은 선물이 없습니다</p>
        </div>
      </div>
    </div>
  )

  // 더보기 탭
  const renderMoreTab = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded-xl overflow-hidden">
        <button
          onClick={() => {
            setShowSettings(true)
            // Close the plus friend modal if it's open
            if (showAddPlusFriend) {
              setShowAddPlusFriend(false)
              setAddPlusFriendStep("info")
            }
          }}
          className="w-full flex items-center gap-4 p-4 active:bg-gray-50"
        >
          <Avatar className="w-14 h-14 rounded-full">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-200 text-lg">{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
            <p className="text-[13px] text-gray-500">{user.phone}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <button
          onClick={() => {
            setShowAddPlusFriend(true)
            // Close settings if it's open
            if (showSettings) {
              setShowSettings(false)
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-[#FEE500] rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-gray-900" />
          </div>
          <span className="text-[11px] text-gray-700">효도시그널</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-[#A0D2DB] rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] text-gray-700">캘린더</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-[#FFB74D] rounded-2xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] text-gray-700">멜론</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-[11px] text-gray-700">설정</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* 헤더 */}
      <header className="h-[52px] flex items-center justify-between px-4 border-b border-gray-100">
        <h1 className="text-[21px] font-bold text-gray-900">
          {activeTab === "friends"
            ? "친구"
            : activeTab === "chats"
              ? "채팅"
              : activeTab === "shopping"
                ? "쇼핑"
                : "더보기"}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          {activeTab === "friends" && (
            <button className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100">
              <Music className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* 탭 콘텐츠 */}
      {activeTab === "friends" && renderFriendsTab()}
      {activeTab === "chats" && renderChatsTab()}
      {activeTab === "shopping" && renderShoppingTab()}
      {activeTab === "more" && renderMoreTab()}

      {/* 하단 네비게이션 */}
      <nav className="h-[52px] flex items-center border-t border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "friends" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[10px]">친구</span>
        </button>
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative ${
            activeTab === "chats" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {pendingRequests.length > 0 && (
              <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#FF3B30] rounded-full flex items-center justify-center px-1">
                <span className="text-[10px] text-white font-bold">{pendingRequests.length}</span>
              </div>
            )}
          </div>
          <span className="text-[10px]">채팅</span>
        </button>
        <button
          onClick={() => setActiveTab("shopping")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "shopping" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="text-[10px]">쇼핑</span>
        </button>
        <button
          onClick={() => setActiveTab("more")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "more" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
          <span className="text-[10px]">더보기</span>
        </button>
      </nav>
    </div>
  )
}
