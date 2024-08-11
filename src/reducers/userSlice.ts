// features/authSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

interface UserState {
  user: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  user: [],
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.loading = true;
    },
    fetchUser: (state, action) => {
      console.log('action user', action);
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailture: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchUserRequest, fetchUser, fetchUserFailture } =
  userSlice.actions;
export default userSlice.reducer;
