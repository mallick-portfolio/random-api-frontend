import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "apiStateData",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = dataSlice.actions;
export default dataSlice.reducer;
