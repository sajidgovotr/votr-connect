import { ReactNode, useState } from "react";
import { styled, useTheme } from "@mui/material";

import { Stack, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";
import { Navbar, Sidebar } from "@/components";

const LayoutBox = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "12px 20px",
    [theme.breakpoints.up("md")]: {
        padding: "20px 30px"
    }
}));

const AppLayout = (): ReactNode => {
    const theme = useTheme();
    const { breakpoints } = theme;
    const IsMdUp = useMediaQuery(breakpoints.up("md"));
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isSidebarExtended, setSidebarExtended] = useState(true);

    const getPaddingLeft = () => {
        if (IsMdUp) {
            return isSidebarExtended ? "270px" : "90px";
        }
        return "0px";
    };

    return (
        <>
            <Stack
                sx={{
                    display: "flex",
                    flex: "1 1 auto",
                    maxWidth: "100%",
                    paddingTop: IsMdUp ? "78px" : "58px",
                    width: "100%",
                    paddingLeft: getPaddingLeft(),
                    transition: "0.3s",
                    minHeight: "100vh"
                }}
            >
                <LayoutBox
                    sx={{
                        backgroundColor: "neutral.50",
                        position: "relative"
                    }}
                >
                    <Outlet />
                </LayoutBox>
            </Stack>
            <Navbar
                onSidebarOpen={() => {
                    setSidebarOpen(true);
                }}
                isSidebarExtended={isSidebarExtended}
                onSidebarExtend={() => {
                    setSidebarExtended(!isSidebarExtended);
                }}
            />
            <Sidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
                isSidebarExtended={isSidebarExtended}
            />
        </>
    );
};

export default AppLayout;
