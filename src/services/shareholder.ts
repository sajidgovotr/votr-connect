import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '@/configs';

export interface Shareholder {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  cusip?: string;
  accountNumber?: string;
  numberOfShares?: number;
  recordDate?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface ShareholdersApiResponse {
  status: boolean;
  statusCode?: number;
  message?: string;
  data: {
    status: boolean;
    message?: string;
    data: {
      data: Shareholder[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ShareholdersQueryArgs {
  brokerId: string;
  page: number;
  limit: number;
}

const shareholderApi = createApi({
  reducerPath: 'shareholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/` }),
  endpoints: (builder) => ({
    getShareholders: builder.query<ShareholdersApiResponse, ShareholdersQueryArgs>({
      query: ({ brokerId, page, limit }) => `/shareholders?brokerId=${brokerId}&page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetShareholdersQuery } = shareholderApi;
export default shareholderApi; 