import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  user: null,
  token: null,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});
export const { setMode, setLogin, setLogout, updateUser } = globalSlice.actions;
export default globalSlice.reducer;
