import { baseURL } from "@/configs";
import { RootState } from "@/store";
import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storageService } from "@/utils/storage";

export const prepareHeaders = (
    headers: Headers,
    { getState }: Pick<BaseQueryApi, "getState">
) => {
    const state = getState() as RootState;
    const token = state.auth.token || storageService.getToken();

    if (token) {
        headers.set("Authorization", `${token}`);
    }

    return headers;
};

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}/`,
    prepareHeaders,
});

export default baseQuery