import {
    Button,
    Stack,
    Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
// import { LogoutConfirmModal } from "../../components";
import { useState } from "react";
import useBreakPoint from "../../hooks/useBreakPoint";
import { storageService } from "@/utils/storage";

const Logout = ({
    navbar,
    isSidebarExtended,
}: {
    navbar?: boolean;
    isSidebarExtended?: boolean;
}) => {
    const isMdUp = useBreakPoint('md');

    const extendedSidebar = () => {
        if (isMdUp) {
            return isSidebarExtended ? true : false;
        }
        return false;
    };

    const handleLogout = async (): Promise<void> => {
        storageService.clearAll();
        window.location.href = '/login';
    };

    if (navbar) {
        return (
            <>
                <Button
                    color="primary"
                    fullWidth
                    size="small"
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Logout
                </Button>
                {/* <LogoutConfirmModal
                    open={isLogoutConfirmModalOpen}
                    onClose={() => setIsLogoutConfirmModalOpen(false)}
                    onConfirm={handleLogout}
                    maxWidth="xs"
                /> */}
            </>
        );
    }

    return (
        <>
            <Stack
                direction={extendedSidebar() ? "row" : "column"}
                alignItems={"center"}
                justifyContent={extendedSidebar() ? "flex-start" : "center"}
                className={`rounded-md !mx-auto cursor-pointer ${extendedSidebar() ? "w-[80%] h-12 !pl-1.5 !my-[0.8rem]" : "w-16 h-16 !pl-0.5 !my-0 "}`}
                spacing={extendedSidebar() ? 1.5 : 0.5}
                onClick={() => {
                    handleLogout();
                }}
            >
                {/* <GoSignOut color="#8C8E9C" size={16} /> */}
                <LogoutIcon />

                <Typography
                    color={"neutral.500"}
                    className={` tracking-[-0.5px] font-[200] ${extendedSidebar() ? "!text-sm" : "!text-[10px]"}`}
                >
                    Logout
                </Typography>
            </Stack>
            {/* <LogoutConfirmModal
                open={isLogoutConfirmModalOpen}
                onClose={() => setIsLogoutConfirmModalOpen(false)}
                onConfirm={() => handleLogout()}
                maxWidth="xs"
            /> */}
        </>
    );
};

export default Logout