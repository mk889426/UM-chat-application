import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  online: boolean;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    updateUserStatus(state, action: PayloadAction<{ id: string; online: boolean }>) {
      const user = state.users.find(u => u.id === action.payload.id);
      if (user) {
        user.online = action.payload.online;
      }
    },
  },
});

export const { setUsers, updateUserStatus } = userSlice.actions;
export default userSlice.reducer;
