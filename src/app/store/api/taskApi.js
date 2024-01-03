// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ["task-item"],
  endpoints: (builder) => ({
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
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetBoardDetailsQuery,
  useAddColumnMutation,
  useAddTaskMutation,
} = taskApi;
