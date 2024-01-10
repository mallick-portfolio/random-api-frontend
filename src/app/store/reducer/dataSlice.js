import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "apiStateData",
  initialState: {
    messages: [],
    currentBoard: [],
    currentNotifications: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
    setCurrentNotifications(state, action) {
      state.currentNotifications = action.payload;
    },
  },
});

export const { setMessages, setCurrentBoard, setCurrentNotifications } =
  dataSlice.actions;
export default dataSlice.reducer;
