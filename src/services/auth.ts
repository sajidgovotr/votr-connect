
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/libs/baseQuery";

interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: credentials
      }),
      transformResponse: (response: {
        data: Partial<IUser> & {
          tokens: {
            accessToken: string;
            idToken: string;
          };
        };
      }) => response.data
    }),
    getUserWithToken: builder.query<Partial<IUser>, void>({
      query: () => "auth/me",
      transformResponse: (response: { data: Partial<IUser> }) => response.data
    })
  })
});

export const { useLoginMutation, useGetUserWithTokenQuery } = authApi;

export default authApi