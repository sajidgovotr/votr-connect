import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService, UserDetails } from "@/utils/storage";
// import { authApi } from "../../services";

export interface AuthState {
    user: UserDetails | null;
    token: string | null;
}

const initialState: AuthState = {
    user: storageService.getUserDetails(),
    token: storageService.getToken()
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            storageService.clearAuth();
            state.token = null;
            state.user = null;
        },
        logIn: (
            state,
            action: PayloadAction<{ token: string; user: UserDetails }>
        ) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            storageService.setToken(token);
            storageService.setUserDetails(user);
        }
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addMatcher(
    //       authApi.endpoints.login.matchFulfilled,
    //       (
    //         state,
    //         action: PayloadAction<
    //           Partial<IUser> & {
    //             tokens: {
    //               accessToken: string;
    //               idToken: string;
    //             };
    //           }
    //         >
    //       ) => {
    //         const { tokens, ...rest } = action.payload;
    //         loggedIn(state, {
    //           token: tokens.accessToken,
    //           user: rest
    //         });
    //       }
    //     )
    //     .addMatcher(
    //       authApi.endpoints.getUserWithToken.matchFulfilled,
    //       (state: AuthState, action: PayloadAction<Partial<IUser>>) => {
    //         const {
    //           payload: {
    //             _id,
    //             name,
    //             email,
    //             userRole,
    //             isActive,
    //             password,
    //             profilePicURL
    //           }
    //         } = action;
    //         state.user = {
    //           _id: _id || "",
    //           name: name || "",
    //           email: email || "",
    //           userRole: userRole || "",
    //           isActive: isActive,
    //           password: password || "",
    //           profilePicURL: profilePicURL || ""
    //         };
    //       }
    //     )
    //     .addMatcher(authApi.endpoints.getUserWithToken.matchRejected, () => {
    //       logout();
    //     });
    // }
});

export const { logout, logIn } = slice.actions;

export default slice.reducer;
