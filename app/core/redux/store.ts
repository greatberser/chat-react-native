// redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './chatSlices';

const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
