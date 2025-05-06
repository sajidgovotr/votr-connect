
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
        }),
        getAllIntegrations: builder.query({
            query: () => ({
                url: "/integrations-hub",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getUploadedCSVFiles: builder.query({
            query: () => ({
                url: "/csv-upload",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getCSVfileData: builder.query({
            query: (id: string) => ({
                url: `/csv-upload/${id}/data`,
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        pullDataFromIntegration: builder.query({
            query: (id: string) => ({
                url: `/file-integration/download-ftp-files/${id}`,
                method: "GET",
            }),
        }),
    })
});

export const { useRestApiIntegrationMutation, useFileUploadIntegrationMutation, useGetAllIntegrationsQuery, useGetUploadedCSVFilesQuery, useGetCSVfileDataQuery, usePullDataFromIntegrationQuery } = expressIntegrationApi;

export default expressIntegrationApi;