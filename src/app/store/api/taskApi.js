// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ["task-item", "board", "task"],
  endpoints: (builder) => ({
    getAllBoard: builder.query({
      query: (boardId) => ({
        url: `/task-board/`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["board"],
    }),
    getBoardDetails: builder.query({
      query: (boardId) => ({
        url: `/task-board/${boardId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["task-item"],
    }),
    getTaskDetails: builder.query({
      query: (task_id) => {
        // if (task_id == null) return;
        return {
          url: `/task-board/task/${task_id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      providesTags: ["task-item", "task"],
    }),
    addColumn: builder.mutation({
      query: (data) => ({
        url: "/task-board/task-item/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["task-item"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/task-board/task/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["task-item"],
    }),
    addBoard: builder.mutation({
      query: (data) => ({
        url: "/task-board/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["board"],
    }),
    moveColumn: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/task-board/task-item/${id}/`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["task-item"],
    }),
    moveTask: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/task-board/task/${id}/`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["task-item"],
    }),
    deleteBoard: builder.mutation({
      query: (id) => {
        return {
          url: `/task-board/${id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["board"],
    }),
    deleteTaskItem: builder.mutation({
      query: (id) => {
        return {
          url: `/task-board/task-item/${id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["task-item"],
    }),
    deleteTask: builder.mutation({
      query: (id) => {
        return {
          url: `/task-board/task/${id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["task-item"],
    }),
    inviteBoardMember: builder.mutation({
      query: ({ action, data }) => {
        return {
          url: `/task-board/invite-board-member/${action}/`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["task-item"],
    }),
    messageFilesUpload: builder.mutation({
      query: (formData) => {
        return {
          url: `/message/attachments/`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            "Content-Type": "multipart/form-data;",
          },
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["task-item"],
    }),
    taskChecklist: builder.mutation({
      query: ({ formData, method, id }) => {
        console.log(formData, method);
        return {
          url: `/task-board/task-label/${id ? id : ""}`,
          method,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
          body: formData,
        };
      },
      invalidatesTags: ["task"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetBoardDetailsQuery,
  useAddColumnMutation,
  useAddTaskMutation,
  useGetAllBoardQuery,
  useAddBoardMutation,
  useMoveColumnMutation,
  useDeleteBoardMutation,
  useDeleteTaskItemMutation,
  useMoveTaskMutation,
  useLazyGetTaskDetailsQuery,
  useInviteBoardMemberMutation,
  useMessageFilesUploadMutation,
  useDeleteTaskMutation,
  useTaskChecklistMutation,
} = taskApi;
