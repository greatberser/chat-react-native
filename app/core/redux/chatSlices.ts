import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChats, createChat, deleteChat } from '../services/api';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
}

interface ChatsState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  chats: [],
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getChatsSuccess(state, action: PayloadAction<Chat[]>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getChatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createChatSuccess(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    deleteChatSuccess(state, action: PayloadAction<string>) {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  getChatsStart,
  getChatsSuccess,
  getChatsFailure,
  createChatSuccess,
  deleteChatSuccess,
  setError,
  clearError,
} = chatsSlice.actions;

export default chatsSlice.reducer;
