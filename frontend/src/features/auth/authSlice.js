import { createSlice, isAction } from "@reduxjs/toolkit";

const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
    user: null,
    token: null,
    isAuthenticated: false,
  };

export const authSlice = createSlice({
  name: "auth",
  initialState : storedAuth,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated =  !!action.payload.token; 
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {login , logout} = authSlice.actions;
export default authSlice.reducer
