export interface ChatRoom {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}
