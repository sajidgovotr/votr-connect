import React, { ReactNode } from "react";
import { Dialog, } from "@mui/material";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    children: ReactNode;
    className?: string;
};

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    maxWidth = "sm",
    children,
    className

}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            data-testid="modal"
            sx={{
                background: "rgba(97, 101, 106, 0.8)",
                ".MuiDialog-paper": {
                    padding: "1.7rem",
                    "::-webkit-scrollbar": { width: "0" }
                },
                div: {
                    borderRadius: "10px"
                }
            }}
            className={className}
        >
            {children}
        </Dialog>
    );
};

export default Modal;
