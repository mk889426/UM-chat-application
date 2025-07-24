"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectRoom } from "../features/chat/chatSlice"
import type { RootState } from "../app/store"

const rooms = [
  { name: "General", icon: "💬", color: "from-gray-500 to-gray-600", description: "General discussions" },
  { name: "Tech", icon: "💻", color: "from-blue-500 to-blue-600", description: "Technology talks" },
  { name: "Gaming", icon: "🎮", color: "from-green-500 to-green-600", description: "Gaming community" },
  { name: "Music", icon: "🎵", color: "from-purple-500 to-purple-600", description: "Music lovers" },
]

const ChatRoomList: React.FC = () => {
  const dispatch = useDispatch()
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoom)

  const handleRoomClick = (room: string) => {
    dispatch(selectRoom(room))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Chat Rooms</h2>
        <p className="text-sm text-gray-500">Choose a room to start chatting</p>
      </div>

      {/* Online status */}
      <div className="mb-6 p-3 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">You're online</span>
        </div>
      </div>

      {/* Room list */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Available Rooms</h3>
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.name
          return (
            <div
              key={room.name}
              className={`group relative cursor-pointer rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white/60 hover:bg-white/80 text-gray-700 hover:shadow-md"
              }`}
              onClick={() => handleRoomClick(room.name)}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  {/* Room icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      isSelected ? "bg-white/20" : `bg-gradient-to-r ${room.color} text-white`
                    }`}
                  >
                    {room.icon}
                  </div>

                  {/* Room info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{room.name}</h4>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                    </div>
                    <p className={`text-xs truncate ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                      {room.description}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                {!isSelected && (
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-200"></div>
                )}
              </div>

              {/* Active indicator */}
              {isSelected && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Click on any room to join the conversation</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
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
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ChatRoomList
