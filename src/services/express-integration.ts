
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/libs/baseQuery";



const expressIntegrationApi = createApi({
    reducerPath: "expressIntegrationApi",
    baseQuery,

    endpoints: (builder) => ({
        restApiIntegration: builder.mutation({
            query: (data: any) => ({
                url: "/rest-api-integration",
                method: "POST",
                body: data
            }),
        }),
        fileUploadIntegration: builder.mutation({
            query: (data: any) => ({
                url: "/file-integration",
                method: "POST",
                body: data
            }),
        })
    })
});

export const { useRestApiIntegrationMutation, useFileUploadIntegrationMutation } = expressIntegrationApi;

export default expressIntegrationApi;