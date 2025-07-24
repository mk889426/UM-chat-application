import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ChatLayout from "../layout/ChatLayout";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import dayjs from "dayjs";

export default function ChatRoom() {
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoom);
  const messages = useSelector((state: RootState) => state.chat.messages[selectedRoom] || []);

  const userId = useSelector((state: RootState) => state.auth.user?.id); // from authSlice
  const currentUser = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === userId)
  );

  return (
    <ChatLayout>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {selectedRoom ? (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              text={message.text}
              sender={message.username}
              own={message.username === currentUser?.username}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Select a room to start chatting
          </div>
        )}
      </div>
      <ChatInput />
    </ChatLayout>
  );
}
