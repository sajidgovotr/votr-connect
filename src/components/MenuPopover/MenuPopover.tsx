import { useRef, useState, ReactNode } from "react";
import { Button, Box, Popover, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type MenuPopover = {
    text?: string;
    avatar?: string;
    role?: string;
    children: ReactNode;
    buttonClassName?: string;
    popoverClassName?: string;
};

//jazzy: this component need used for AccountPopover and for other popover and also it should be in common

const MenuPopover: React.FC<MenuPopover> = ({
    text,
    avatar,
    children,
    buttonClassName = "",
    popoverClassName = ""
}) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                ref={anchorRef}
                onClick={handleOpen}
                className={`relative flex items-center p-0 !w-8 !h-8 ${open ? 'before:content-["" before:absolute before:w-full before:h-full before:rounded-md before:bg-muted' : ''} ${buttonClassName}`}
            >
                <Avatar>{avatar || text?.charAt(0)}</Avatar>
                <Box ml={0.8}>
                    <KeyboardArrowDownIcon />
                </Box>
            </Button>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                className={popoverClassName}
                sx={{ width: 220 }}
            >
                {children}
            </Popover>
        </>
    );
};

export default MenuPopover;
