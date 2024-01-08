import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getIndividualNotification: builder.query({
      query: () => ({
        url: `/notification/`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: [],
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
      invalidatesTags: [],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetIndividualNotificationQuery } = notificationApi;
