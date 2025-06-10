import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/libs/baseQuery";
import { jwtDecode } from "jwt-decode";
import { UserDetails } from "@/utils/storage";


interface LoginResponse {
  data: {
    statusCode: number;
    message: string;
    data: {
      access_token: string;
    };
  };
}

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: UserDetails },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        const token = response.data.data.access_token;
        const decodedUser = jwtDecode<UserDetails>(token);
        return {
          token,
          user: decodedUser
        };
      },
    }),
    getUserWithToken: builder.query<UserDetails, void>({
      query: () => "auth/me",
      transformResponse: (response: { data: UserDetails }) => response.data,
    }),
  }),
});

export const { useLoginMutation, useGetUserWithTokenQuery } = authApi;
export default authApi;
