import { Paper, Box, Grid2 } from "@mui/material";
import { Outlet } from "react-router";
import AuthBgImg from "@/assets/images/auth-bg.png";
import { JSX } from "react";

const AuthLayout = (): JSX.Element => {
    return (
        <Grid2 container component="main" sx={{ height: "100vh", width: "100%" }}>
            <Grid2
                size={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}
                sx={{ display: { lg: "block", xs: "none" } }}
            >
                <Box
                    sx={{
                        height: "100vh",
                        overflow: "hidden",
                        p: 2
                    }}
                >
                    <img
                        src={AuthBgImg}
                        alt="bg-img"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            objectPosition: "top"
                        }}
                    />
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}
                sx={{ boxShadow: "none", pr: 2 }}
                component={Paper}
            >
                <Outlet />
            </Grid2>
        </Grid2>
    );
};

export default AuthLayout;
