// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // This should be a default export
