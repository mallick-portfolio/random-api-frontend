// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getBoardDetails: builder.query({
      query: (boardId) => ({
        url: `/task-board/${boardId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
    // user login api
    userLogin: builder.mutation({
      query: (logindata) => ({
        url: "/account/login/",
        method: "POST",
        body: logindata,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetBoardDetailsQuery } = taskApi;
