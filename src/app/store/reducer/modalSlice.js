import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showAddColumnModal: false,
    showAddTaskModal: false,
    showAddBoardModal: false,
    selectedTaskItem: null,
  },
  reducers: {
    setShowAddColumnModal(state, action) {
      state.showAddColumnModal = action.payload;
    },
    setShowAddTaskModal(state, action) {
      state.showAddTaskModal = action.payload;
    },
    setSelectedTaskItem(state, action) {
      state.selectedTaskItem = action.payload;
    },
    setShowAddBoardModal(state, action) {
      state.showAddBoardModal = action.payload;
    },
  },
});

export const {
  setShowAddColumnModal,
  setShowAddTaskModal,
  setSelectedTaskItem,
  setShowAddBoardModal,
} = modalSlice.actions;
export default modalSlice.reducer;
