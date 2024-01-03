import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showAddColumnModal: false,
    showAddTaskModal: false,
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
  },
});

export const {
  setShowAddColumnModal,
  setShowAddTaskModal,
  setSelectedTaskItem,
} = modalSlice.actions;
export default modalSlice.reducer;
