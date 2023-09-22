import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  mode: "dark",
  user: {},
  token: token || null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = {};
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { toggleMode, setLogin, setLogout, setUser } = globalSlice.actions;

export default globalSlice.reducer;
