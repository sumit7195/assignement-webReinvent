import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import userReducer from '../reducers/userSlice';
import apiMiddleware from '../middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});
