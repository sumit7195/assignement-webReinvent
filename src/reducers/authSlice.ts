// features/authSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: number;
    name: string;
  } | null;
  error: null | string;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: number; name: string };
      }>
    ) => {
      console.log('action', action);
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: number; name: string };
      }>
    ) => {
      console.log('action', action);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  loginSuccess,
  logout,
  loginFailure,
  loginRequest,
  clearError,
  registerRequest,
  registerSuccess,
  registerFailure
} = authSlice.actions;
export default authSlice.reducer;
