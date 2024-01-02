import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    test: "",
    isLoading: false,
  },
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    setIsloading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setTest } = globalSlice.actions;
export default globalSlice.reducer;
