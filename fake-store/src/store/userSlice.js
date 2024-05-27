// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userSignedOut: (state) => {
      state.user = null;
      state.token = null;
    },
    userSignedUp: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const { userSignedIn, userSignedOut, userSignedUp } = userSlice.actions;
export default userSlice.reducer;
