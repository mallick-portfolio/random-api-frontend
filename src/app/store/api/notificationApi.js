import config from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.BASE_URL}/api/v1`,
  }),
  tagTypes: ["notification"],
  endpoints: (builder) => ({
    getIndividualNotification: builder.query({
      query: () => ({
        url: `/notification/`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notification/${id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        };
      },
      invalidatesTags: ["notification"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetIndividualNotificationQuery,
  useDeleteNotificationMutation,
} = notificationApi;
