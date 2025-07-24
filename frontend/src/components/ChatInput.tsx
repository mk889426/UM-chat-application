import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../features/chat/chatSlice"
import type { RootState } from "../app/store"
import dayjs from "dayjs"

export default function ChatInput() {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const dispatch = useDispatch()
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoom)
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  const currentUser = useSelector((state: RootState) => state.users.users.find((user) => user.id === userId))

  const handleSend = () => {
    console.log("handlesend working")
    if (text.trim() && selectedRoom && currentUser) {
      dispatch(
        addMessage({
          roomId: selectedRoom,
          message: {
            text,
            username: currentUser.username,
            timestamp: dayjs().toISOString(),
          },
        }),
      )
      setText("")
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setIsTyping(e.target.value.length > 0)
  }

  const isDisabled = !text.trim() || !selectedRoom || !currentUser

  return (
    <div className="relative">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Main input container */}
      <div className="relative z-10 p-6 border-t border-white/20">
        {/* Room indicator */}
        {selectedRoom && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Chatting in <span className="font-medium text-gray-800">#{selectedRoom}</span>
            </span>
          </div>
        )}

        {/* Input area */}
        <div className="flex items-end space-x-3">
          {/* Message input */}
          <div className="flex-1 relative">
            <div className="relative">
              <input
                className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                type="text"
                placeholder={selectedRoom ? `Message #${selectedRoom}...` : "Select a room to start chatting..."}
                value={text}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={!selectedRoom}
                maxLength={500}
              />

              {/* Character counter */}
              {text.length > 400 && (
                <div className="absolute -top-6 right-0 text-xs text-gray-500">{text.length}/500</div>
              )}

              {/* Emoji button placeholder */}
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
                disabled={!selectedRoom}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Typing indicator */}
            {isTyping && (
              <div className="absolute -top-6 left-0 text-xs text-blue-600 animate-fade-in">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span>Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Send button */}
          <button
            className={`group relative overflow-hidden rounded-2xl px-6 py-4 font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-95"
              }`}
            onClick={handleSend}
            disabled={isDisabled}
          >
            <div className="flex items-center space-x-2">
              <span>Send</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${!isDisabled ? "group-hover:translate-x-1" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>

            {/* Button shine effect */}
            {!isDisabled && (
              <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
            )}
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Press Enter to send</span>
            {currentUser && (
              <span>
                Chatting as <span className="font-medium text-gray-700">{currentUser.username}</span>
              </span>
            )}
          </div>

          {/* Connection status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Connected</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-shine {
          animation: shine 0.6s ease-out;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}
