import { Stack, Typography } from "@mui/material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLefttIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useLocation } from "react-router";
import AccountPopover from "../AccountPopover";
import { formatDashedString } from "@/utils/helpers";



interface INavbar {
    onSidebarOpen?: () => void;
    isSidebarExtended: boolean;
    onSidebarExtend: () => void;
}

const Navbar = (props: INavbar) => {
    const { onSidebarOpen, isSidebarExtended, onSidebarExtend, ...rest } = props;
    const location = useLocation();
    const title = location.pathname.split("/")[1] || "dashboard";
    // const { user } = useSelector((state: RootState) => state.auth);
    const queryParams = new URLSearchParams(location.search);
    const tabName = queryParams.get("tab");
    const displayTitle = formatDashedString(title);

    return (
        <>
            <AppBar
                className={`border-b border-gray-200 !transition-all !duration-500 !ease-in-out ${isSidebarExtended
                    ? "md:left-[250px] md:!w-[calc(100%-250px)]"
                    : "md:left-[90px] md:!w-[calc(100%-90px)]"
                    }`}


                {...rest}
            >
                <Toolbar
                    disableGutters
                    className="left-0 w-full !px-1 md:!px-[15px]"
                >
                    <Box

                        className="absolute -left-[13px] top-[20px] hidden md:block cursor-pointer w-[28px] h-[26px] rounded-[15px] bg-white text-black"
                        onClick={onSidebarExtend}
                        aria-label="Toggle Sidebar"
                    >

                        {
                            isSidebarExtended ? <KeyboardArrowLefttIcon /> : <KeyboardArrowRightIcon />
                        }
                    </Box>
                    <IconButton
                        onClick={onSidebarOpen}
                        className="!inline-flex md:!hidden mr-1"
                        color="primary"
                        aria-label="menu"
                    >
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                    <Typography
                        fontWeight={500}
                        fontSize={{ xs: 18, sm: 24 }}
                        letterSpacing={"-1%"}
                        lineHeight={"30px"}
                        color={"text.primary"}
                    >
                        {tabName ? tabName : displayTitle}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction={"row"} alignItems={"center"} spacing={0.8}>
                        {/* <Tooltip title="Notifications">
                            <IconButton>
                                <Badge
                                    color="error"
                                    variant="standard"
                                    badgeContent={5}

                                >
                                    <img src={BellIcon} alt="notification-icon" width={17} data-testid="notification-icon" />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Help">
                            <IconButton>
                                <img src={HelpIcon} alt="help-icon" width={20} data-testid="help-icon" />
                            </IconButton>
                        </Tooltip> */}
                        <AccountPopover />
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar