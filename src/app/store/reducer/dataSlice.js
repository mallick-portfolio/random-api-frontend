import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "apiStateData",
  initialState: {
    messages: [],
    currentBoard: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
  },
});

export const { setMessages, setCurrentBoard } = dataSlice.actions;
export default dataSlice.reducer;
