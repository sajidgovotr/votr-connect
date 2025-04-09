import { RootState } from "@/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const useAccountPopover = () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleOpen = (): void => {
        setOpen(true);
    };
    const handleClose = (): void => {
        setOpen(false);
    };


    return {
        handlers: {
            handleOpen,
            handleClose
        },
        state: {
            anchorRef,
            open,
            user
        }
    }
}

export default useAccountPopover