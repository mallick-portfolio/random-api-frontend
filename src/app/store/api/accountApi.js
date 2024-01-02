// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/account/me/",
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
    // user login api
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/account/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMeQuery, useUserLoginMutation, useUserRegisterMutation } =
  accountApi;
