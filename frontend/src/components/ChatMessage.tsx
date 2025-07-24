"use client"
import { useState } from "react"

interface ChatMessageProps {
  text: string
  sender: string
  own?: boolean
  timestamp?: string
}

export default function ChatMessage({ text, sender, own, timestamp }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate avatar initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate consistent color for user based on name
  const getUserColor = (name: string) => {
    const colors = [
      "from-red-400 to-red-500",
      "from-blue-400 to-blue-500",
      "from-green-400 to-green-500",
      "from-purple-400 to-purple-500",
      "from-pink-400 to-pink-500",
      "from-indigo-400 to-indigo-500",
      "from-yellow-400 to-yellow-500",
      "from-teal-400 to-teal-500",
    ]
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // Format timestamp
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={`group mb-4 animate-fade-in ${own ? "flex justify-end" : "flex justify-start"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${own ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        {!own && (
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${getUserColor(sender)} flex items-center justify-center text-white text-xs font-medium shadow-md flex-shrink-0`}
          >
            {getInitials(sender)}
          </div>
        )}

        {/* Message bubble */}
        <div className="relative">
          {/* Sender name (only for others' messages) */}
          {!own && (
            <div className="mb-1 ml-3">
              <span className="text-xs font-medium text-gray-600">{sender}</span>
            </div>
          )}

          {/* Message content */}
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
              own
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                : "bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-md border border-gray-100"
            } ${isHovered ? "shadow-md transform scale-[1.02]" : ""}`}
          >
            {/* Message text */}
            <p className="text-sm leading-relaxed break-words">{text}</p>

            {/* Timestamp */}
            <div
              className={`text-xs mt-1 transition-opacity duration-200 ${
                own ? "text-white/70" : "text-gray-500"
              } ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            >
              {formatTime(timestamp)}
            </div>

            {/* Message tail */}
            <div
              className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
                own
                  ? "right-0 translate-x-1 translate-y-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  : "left-0 -translate-x-1 translate-y-1 bg-white/80 border-l border-b border-gray-100"
              }`}
            />
          </div>

          {/* Message status (for own messages) */}
          {own && (
            <div className="flex justify-end mt-1 mr-3">
              <div className="flex items-center space-x-1">
                {/* Delivered indicator */}
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {/* Read indicator */}
                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Own avatar */}
        {own && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shadow-md flex-shrink-0">
            {getInitials(sender)}
          </div>
        )}
      </div>

      {/* Message actions (visible on hover) */}
      <div
        className={`absolute ${
          own ? "left-0" : "right-0"
        } top-1/2 transform -translate-y-1/2 flex space-x-1 transition-all duration-200 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        {/* React button */}
        <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-yellow-500 transition-colors duration-200">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {/* Reply button */}
        <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
