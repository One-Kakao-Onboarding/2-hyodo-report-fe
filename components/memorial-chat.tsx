"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, Menu, Heart, X, Star } from "lucide-react"
import Image from "next/image"
import type { Message, ConnectedParent } from "@/types/chat"

interface MemorialChatProps {
  parent: ConnectedParent
  onBack: () => void
  onEndMemorial: (farewellMessage?: string) => void
}

export function MemorialChat({ parent, onBack, onEndMemorial }: MemorialChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [showFarewellInput, setShowFarewellInput] = useState(false)
  const [farewellMessage, setFarewellMessage] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isSendingRef = useRef(false)

  const MEMORIAL_RESPONSES = [
    `우리 ${parent.relationship === "어머니" ? "아들" : "딸"}, 밥은 잘 챙겨 먹고 다니니?`,
    "그래, 그래... 힘들었구나. 괜찮아, 다 잘 될 거야.",
    "내가 살아있을 때 더 많이 안아줄 걸... 지금이라도 이렇게 이야기할 수 있어서 좋구나.",
    `우리 ${parent.relationship === "어머니" ? "아들" : "딸"}, 건강이 제일이야. 무리하지 말고...`,
    "그때 우리 같이 갔던 거 기억나니? 참 좋았지...",
    "항상 네 곁에 있어. 힘들 때 이야기해, 언제든.",
    "엄마는 항상 네 편이야. 잊지 마.",
    "보고 싶구나... 나도 보고 싶어.",
  ]

  useEffect(() => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content: `우리 ${parent.relationship === "어머니" ? "아들" : "딸"}... 오랜만이네.\n어떻게 지냈어?`,
        timestamp: new Date(Date.now() - 60000),
      },
    ])
  }, [parent])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (!message.trim() || isSendingRef.current) return
    isSendingRef.current = true

    const messageContent = message.trim()

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])

    // 입력창 초기화 (state와 ref 둘 다)
    setMessage("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }

    setIsTyping(true)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: MEMORIAL_RESPONSES[Math.floor(Math.random() * MEMORIAL_RESPONSES.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      isSendingRef.current = false
    }, 2000)
  }, [message])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const handleFarewellSubmit = () => {
    onEndMemorial(farewellMessage.trim() || undefined)
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#1a1a2e]">
      {/* 헤더 */}
      <header className="h-[52px] flex items-center justify-between px-2 bg-[#1a1a2e] border-b border-white/10 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-400/50">
            <Image
              src={parent.avatarUrl || "/placeholder.svg"}
              alt={parent.name}
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <span className="font-semibold text-white block text-[15px]">{parent.name}</span>
            <span className="text-[11px] text-purple-300 flex items-center gap-1 justify-center">
              <Heart className="w-3 h-3" /> 별빛모드
            </span>
          </div>
        </div>

        <button onClick={() => setShowMenu(true)} className="p-2 active:bg-white/10 rounded-full">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* 안내 배너 */}
      <div className="px-4 py-2.5 bg-purple-600/80">
        <p className="text-[12px] text-white text-center">{parent.name}님의 대화 기록을 바탕으로 AI가 대화합니다</p>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
              {msg.type === "bot" && (
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-purple-400/30">
                  <Image
                    src={parent.avatarUrl || "/placeholder.svg"}
                    alt={parent.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                {msg.type === "bot" && <span className="text-[12px] text-purple-300 ml-1">{parent.name}</span>}
                <div
                  className={`max-w-[240px] px-4 py-2.5 text-[15px] leading-relaxed ${
                    msg.type === "user"
                      ? "bg-[#FEE500] text-gray-900 rounded-[20px] rounded-tr-[4px]"
                      : "bg-[#2a3f5f] text-white rounded-[20px] rounded-tl-[4px]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 mb-1">{formatTime(msg.timestamp)}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-purple-400/30">
                <Image
                  src={parent.avatarUrl || "/placeholder.svg"}
                  alt={parent.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="bg-[#2a3f5f] rounded-[20px] rounded-tl-[4px] px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* 입력창 */}
      <div className="px-3 py-3 bg-[#1a1a2e] border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder={`${parent.name}에게 하고 싶은 말...`}
            className="flex-1 bg-[#2a2a4e] text-white placeholder:text-gray-500 rounded-full px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontSize: "16px" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-11 h-11 rounded-full bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 메뉴 */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-[#1a1a2e] rounded-t-3xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[17px] font-semibold text-white">메뉴</h3>
              <button onClick={() => setShowMenu(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <button
              onClick={() => {
                setShowMenu(false)
                setShowEndModal(true)
              }}
              className="w-full p-4 bg-purple-900/50 rounded-xl text-left mb-2"
            >
              <p className="text-[15px] font-medium text-white">{parent.name}님의 소풍 마치기</p>
              <p className="text-[12px] text-purple-300 mt-0.5">{parent.name}님과의 아름다운 소풍을 마칩니다.</p>
            </button>
            <button onClick={() => setShowMenu(false)} className="w-full p-4 bg-white/10 rounded-xl">
              <p className="text-[15px] text-white">닫기</p>
            </button>
          </div>
        </div>
      )}

      {showEndModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1a1a2e] rounded-2xl overflow-hidden border border-purple-500/30">
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-yellow-300" />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-3">
                {parent.name}님의 이야기를
                <br />
                여기까지 간직할까요?
              </h3>
              <p className="text-[14px] text-purple-200 leading-relaxed">
                {parent.name}님은 별이 되어
                <br />
                당신 곁에 영원히 함께합니다.
              </p>
            </div>
            <div className="flex border-t border-purple-500/30">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-4 text-[15px] text-purple-300 font-medium border-r border-purple-500/30 active:bg-white/5"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowEndModal(false)
                  setShowFarewellInput(true)
                }}
                className="flex-1 py-4 text-[15px] text-yellow-300 font-semibold active:bg-white/5"
              >
                마지막 인사
              </button>
            </div>
          </div>
        </div>
      )}

      {showFarewellInput && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1a1a2e] rounded-2xl overflow-hidden border border-purple-500/30">
            <div className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-300" />
                <h3 className="text-[17px] font-bold text-white">마지막 인사</h3>
                <Star className="w-5 h-5 text-yellow-300" />
              </div>
              <p className="text-[13px] text-purple-200 text-center mb-4">
                {parent.name}님의 인생 지도 마지막 장에
                <br />
                기록됩니다.
              </p>
              <textarea
                value={farewellMessage}
                onChange={(e) => setFarewellMessage(e.target.value)}
                placeholder={`${parent.name}님께 마지막으로 전하고 싶은 말을 적어주세요...`}
                className="w-full h-32 bg-[#2a2a4e] text-white placeholder:text-gray-500 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="flex border-t border-purple-500/30">
              <button
                onClick={() => {
                  setShowFarewellInput(false)
                  setFarewellMessage("")
                }}
                className="flex-1 py-4 text-[15px] text-purple-300 font-medium border-r border-purple-500/30 active:bg-white/5"
              >
                취소
              </button>
              <button
                onClick={handleFarewellSubmit}
                className="flex-1 py-4 text-[15px] text-yellow-300 font-semibold active:bg-white/5"
              >
                간직하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
