import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authSlice from "./auth";

import { authApi, expressIntegrationApi } from "@/services";
import shareholderApi from '@/services/shareholder';

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [expressIntegrationApi.reducerPath]: expressIntegrationApi.reducer,
        [shareholderApi.reducerPath]: shareholderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            expressIntegrationApi.middleware,
            shareholderApi.middleware
        )
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
