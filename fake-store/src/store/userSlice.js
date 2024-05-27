// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignedUp(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userSignedIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userSignedOut(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { userSignedUp, userSignedIn, userSignedOut } = userSlice.actions;

export default userSlice.reducer;
