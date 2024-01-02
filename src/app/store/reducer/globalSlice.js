import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    test: "",
    user: {},
  },
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setTest , setUser} = globalSlice.actions;
export default globalSlice.reducer;
