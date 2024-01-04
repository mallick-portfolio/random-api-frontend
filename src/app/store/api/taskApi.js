// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ["task-item", "board"],
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
        console.log(id, data);
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
} = taskApi;
