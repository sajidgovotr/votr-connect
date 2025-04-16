import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import useBreakPoint from "../../hooks/useBreakPoint";

interface SidebarItemProps {
    href: string;
    icon: ReactNode | null;
    iconInactive: ReactNode | null;
    title: string;
    isSidebarExtended?: boolean;
}

const NavItem = (props: SidebarItemProps) => {
    const navigate = useNavigate();
    const { href, icon, iconInactive, title, isSidebarExtended } = props;
    const router = useLocation();
    const { id } = useParams();
    const active = href
        ? router.pathname === href ||
        router.pathname === `${href}/${id}` ||
        `/${router.pathname.split("/")[1]}` === href
        : false;
    const isMdUp = useBreakPoint('md');

    const extendedSidebar = () => {
        if (isMdUp) {
            return isSidebarExtended ? true : false;
        }
        return false;
    };

    return (
        <Box sx={{ position: "relative" }}>
            {active && (
                <Box
                    className={`bg-primaryMain absolute top-0.5 bottom-0 left-0 w-1 rounded-r-[10px] rounded-b-[1px0]  ${extendedSidebar() ? "h-11" : "h-14"}`}

                />
            )}
            <Stack
                direction={extendedSidebar() ? "row" : "column"}
                alignItems={"center"}
                justifyContent={extendedSidebar() ? "flex-start" : "center"}
                // sx={{

                className={`${active ? "bg-primaryLight" : ""} rounded-md !mx-auto cursor-pointer ${extendedSidebar() ? "w-[80%] h-12 !pl-1.5 !my-[0.8rem]" : "w-16 h-16 !pl-0.5 !my-0 "}`}
                spacing={extendedSidebar() ? 1.5 : 0.5}
                onClick={() => {
                    navigate(href);
                }}
            >
                {active ? icon : iconInactive}

                <Typography
                    color={"white"}
                    className={` tracking-[-0.5px] font-[200] text-center ${extendedSidebar() ? "!text-sm" : "!text-[10px]"}`}
                >
                    {title}
                </Typography>
            </Stack>
        </Box>
    );
};

export default NavItem