import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { authApi } from "../../services";

export interface AuthState {
    user: {
        id: string;
        name: string;
        email: string;
        userRole: string;
        isActive: boolean;
        password: string;
        profilePicURL: string;
    } | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("jwtToken")
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("jwtToken");
            state.token = null;
            state.user = null;
        },
        logIn: (
            state,
            action: PayloadAction<{ token: string; user: Partial<AuthState['user']> }>
        ) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = {
                id: user?.id || "",
                name: user?.name || "",
                email: user?.email || "",
                userRole: user?.userRole || "",
                isActive: user?.isActive || false,
                password: user?.password || "",
                profilePicURL: user?.profilePicURL || ""
            };
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("role", user?.userRole || "");
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
