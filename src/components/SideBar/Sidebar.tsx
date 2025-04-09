import { useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Drawer } from "@mui/material";

import { SidebarItems } from "@/constants/SidebarItem";

import useBreakPoint from "../../hooks/useBreakPoint";
import NavItem from "../NavItem";
import { Logo } from "..";
import Logout from "../Logout";
import { ISidebarItem } from "@/types/global";


interface SidebarProps {
    open: boolean;
    onClose?: () => void;
    isSidebarExtended: boolean;
}

const Sidebar = (props: SidebarProps) => {
    const { open, onClose, isSidebarExtended } = props;
    const router = useLocation();

    const isMdUp = useBreakPoint('md');

    useEffect(() => {
        if (open) {
            onClose?.();
        }
    }, [router.pathname]);

    const extendedSidebar = () => {
        if (isMdUp) {
            return isSidebarExtended ? true : false;
        }
        return false;
    };

    const Items = () => {
        return (
            <>
                <Box
                    data-testid="sidebar"
                    className={`py-2 ${extendedSidebar()
                        ? ''
                        : 'border border-transparent bg-radial-gradient'
                        }`}
                >
                    {/* {isSidebarExtended && isMdUp && (
                        <Typography

                            color="#8C8E9C"
                            fontSize={"12px"}
                            lineHeight={"29px"}
                            letterSpacing={"1px"}
                            paddingLeft={3}
                            marginBottom={2}
                        >
                            HOME
                        </Typography>
                    )} */}

                    {SidebarItems.UserItems.home.map((item: ISidebarItem) => {
                        return (
                            <NavItem
                                key={item.href}
                                icon={item.icon}
                                iconInactive={item.iconInactive}
                                href={item.href}
                                title={item.title}
                                isSidebarExtended={isSidebarExtended}
                            />
                        )
                    })}
                </Box>
                {isSidebarExtended && isMdUp && (
                    <Box
                        height={"0.5px"}
                        width={"80%"}
                        margin={"0px auto"}
                        className='!bg-darkGray'
                    />
                )}
                <Box
                    paddingY={2}
                >
                    {/* {isSidebarExtended && isMdUp && (
                        <Typography
                            color="#8C8E9C"
                            fontSize={"12px"}
                            lineHeight={"29px"}
                            letterSpacing={"1px"}
                            fontWeight={500}
                            paddingLeft={3}
                            marginBottom={1}
                        >
                            OTHERS
                        </Typography>
                    )} */}
                    {/* {SidebarItems.ConstantItems.map((item: ISidebarItem) => {
                        return (
                            <NavItem
                                key={item.title}
                                icon={item.icon}
                                iconInactive={item.iconInactive}
                                href={item.href}
                                title={item.title}
                                isSidebarExtended={isSidebarExtended}
                            />
                        );
                    })} */}
                </Box>
            </>
        );
    };

    const content = (
        <>
            <Box
                className="logged-in-sidebar-wrapper"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <Box
                    className={`flex items-center justify-center border-b ${extendedSidebar() ? 'border-darkGray' : 'border-none'
                        } md:h-[78px] h-[58px]`}
                >
                    <Logo full={isSidebarExtended} />
                </Box>
                <Box flexGrow={1}><Items /></Box>
                <Box marginY={0.5}>
                    <Logout isSidebarExtended={isSidebarExtended} />
                </Box>
            </Box>
        </>
    );

    if (isMdUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    className: `!text-white ${isSidebarExtended ? 'w-[250px]' : 'w-[90px]'} 
                border-r-0 shadow-sideBar 
                !transition-all !duration-500 !ease-in-out !bg-primaryDark flex !z-0`,
                }}
                variant={"permanent"}
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                className: '!bg-primaryDark w-[90px] !text-white !flex '
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
            disablePortal
        >
            {content}
        </Drawer>
    );
};

export default Sidebar