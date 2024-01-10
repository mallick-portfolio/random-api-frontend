import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showChatBox: false,
    showAddColumnModal: false,
    showAddTaskModal: false,
    showAddBoardModal: false,
    showDeleteBoardModal: false,
    showDeleteTaskItemModal: false,
    showTaskDetailModal: false,
    showInviteBoardModal: false,
    showDeleteNotificationModal: false,
    selectedTaskItem: null,
    selectedNotificationId: null,
    taskDetails: null,
  },
  reducers: {
    setShowChatBox(state, action) {
      state.showChatBox = action.payload;
    },
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
    setShowDeleteBoardModal(state, action) {
      state.showDeleteBoardModal = action.payload;
    },
    setShowDeleteTaskItemModal(state, action) {
      state.showDeleteTaskItemModal = action.payload;
    },
    setShowTaskDetailModal(state, action) {
      state.showTaskDetailModal = action.payload;
    },
    setTaskDetails(state, action) {
      state.taskDetails = action.payload;
    },
    setShowInviteBoardModal(state, action) {
      state.showInviteBoardModal = action.payload;
    },
    setShowDeleteNotificationModal(state, action) {
      state.showDeleteNotificationModal = action.payload;
    },
    setSelectedNotificationId(state, action) {
      state.selectedNotificationId = action.payload;
    },
  },
});

export const {
  setShowAddColumnModal,
  setShowAddTaskModal,
  setSelectedTaskItem,
  setShowAddBoardModal,
  setShowDeleteBoardModal,
  setShowDeleteTaskItemModal,
  setTaskDetails,
  setShowTaskDetailModal,
  setShowChatBox,
  setShowInviteBoardModal,
  setShowDeleteNotificationModal,
  setSelectedNotificationId,
} = modalSlice.actions;
export default modalSlice.reducer;
