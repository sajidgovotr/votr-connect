import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/libs/baseQuery";
import { EnvironmentEnum } from "@/types/environment";
import { storageService } from "@/utils/storage";

interface Product {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  createdAt: string;
  updatedAt: string;
}

interface IntegrationMethod {
  id: string;
  methodName: string;
  code: string;
  description: string;
  iconKey: string;
  status: 'Recommended' | 'Default' | 'ComingSoon';
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface IntegrationConfigDto {
  configKey: string;
  configValue: string;
}

interface IntegrationAuthDto {
  authKey: string;
  authValue: string;
}

interface CreateIntegrationWithDetailsDto {
  productId: string;
  brokerId: string;
  integrationMethodId: string;
  environment: EnvironmentEnum;
  name: string;
  createdBy: string;
  configs: IntegrationConfigDto[];
  auths: IntegrationAuthDto[];
}

interface IntegrationWithDetails {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  createdAt: string;
  updatedAt: string;
  integrationMethod: IntegrationMethod;
  environment: EnvironmentEnum;
  brokerId: number;
  configs: IntegrationConfigDto[];
  auths: IntegrationAuthDto[];
}

const expressIntegrationApi = createApi({
    reducerPath: "expressIntegrationApi",
    baseQuery,
    tagTypes: ['Integration'],

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
        createIntegrationWithDetails: builder.mutation<any, CreateIntegrationWithDetailsDto>({
            query: (payload) => {
                return {
                    url: `/integrations/with-details`,
                    method: "POST",
                    body: payload,
                };
            },
        }),
        getProducts: builder.query<ApiResponse<Product[]>, void>({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
        }),
        getIntegrationMethods: builder.query<ApiResponse<IntegrationMethod[]>, void>({
            query: () => ({
                url: "/integration-methods",
                method: "GET",
            }),
        }),
        getAllIntegrationsWithDetails: builder.query<ApiResponse<IntegrationWithDetails[]>, void>({
            query: () => {
                const userDetails = storageService.getUserDetails();
                return {
                    url: `integrations/with-details?brokerId=${userDetails?.brokerId}`,
                    method: 'GET',
                };
            },
            providesTags: ['Integration'],
        }),
    })
});

export const { useRestApiIntegrationMutation, useFileUploadIntegrationMutation, useGetAllIntegrationsQuery, useGetUploadedCSVFilesQuery, useGetCSVfileDataQuery, usePullDataFromIntegrationQuery, useGetProductsQuery, useGetIntegrationMethodsQuery, useCreateIntegrationWithDetailsMutation, useGetAllIntegrationsWithDetailsQuery } = expressIntegrationApi;

export default expressIntegrationApi;