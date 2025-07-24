import type React from "react"
import ChatRoomList from "../components/ChatRoomList"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-80 bg-white/80 backdrop-blur-sm border-r border-white/20 shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 p-6 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatRoom
            </h1>
          </div>
        </div>
        <ChatRoomList />
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  )
}
