// src/redux/slices/chatSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  username: string;
  timestamp: string;
}

interface ChatState {
  selectedRoom: string;
  messages: {
    [roomId: string]: Message[];
  };
}

const initialState: ChatState = {
  selectedRoom: '',
  messages: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectRoom(state, action: PayloadAction<string>) {
      state.selectedRoom = action.payload;
    },
    addMessage(
      state,
      action: PayloadAction<{
        roomId: string;
        message: Message;
      }>
    ) {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);
    },
  },
});

export const { selectRoom, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
