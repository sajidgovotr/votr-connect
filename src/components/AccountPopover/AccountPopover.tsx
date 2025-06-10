import { Button, Box, Typography, Divider, Avatar, Popover } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Logout } from "@/components";
import useAccountPopover from "./useAccountPopover";

const AccountPopover = () => {
    const {
        state: { anchorRef, open, user },
        handlers: { handleOpen, handleClose },
    } = useAccountPopover();

    return (
        <div data-testid="account-popover">
            <Button
                data-testid="account-popover-button"
                ref={anchorRef}
                onClick={handleOpen}
                className={`relative flex items-center p-0 !w-4 !h-4 ${open ? 'before:content-[\'\'] before:absolute before:w-full before:h-full before:rounded-md before:bg-muted' : ''}`}
            >
                <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.fullName?.charAt(0) || 'U'}
                </Avatar>
                <Box ml={0.8}>
                    <KeyboardArrowDownIcon />
                </Box>
            </Button>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current as Element}
                sx={{ width: 220 }}
            >
                <Box className="!my-1.5 !px-2.5">
                    <Typography variant="subtitle1" noWrap>
                        {user?.fullName}
                    </Typography>
                    <Typography variant="subtitle2" color={"#8D8D8D"} noWrap mt={0.5}>
                        {user?.roleName}
                    </Typography>
                </Box>
                <Divider className="!my-1" />
                <Box className="!pb-1 !px-2">
                    <Logout navbar />
                </Box>
            </Popover>
        </div>
    );
}

export default AccountPopover