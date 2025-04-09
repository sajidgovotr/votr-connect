
import { useContext } from "react";
import {
    Snackbar,
    Slide,
    Alert,
    AlertTitle,
    SnackbarOrigin,
    Backdrop
} from "@mui/material";
import { IMessageContext, MessageContext } from "@/context/message-context";

const SnackbarMessage = () => {
    const position: SnackbarOrigin = {
        vertical: "top",
        horizontal: "right"
    };

    const { snackbarState, hideSnackbar } = useContext(
        MessageContext
    ) as IMessageContext;
    const autoHideDuration = snackbarState.duration;
    const variant = snackbarState.variant;
    function onClose(): void {
        hideSnackbar();
    }

    const getColors = () => {
        if (variant === "error") {
            return "#EA4334";
        }
        if (variant === "success") {
            return "#27BE69";
        }
        if (variant === "warning") {
            return "#FFBF0F";
        }
        return "#5263FF";
    };

    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
                background: "rgba(3, 7, 18, 0.2)"
            }}
            open={snackbarState.isSnackbarVisible}
        >
            <Snackbar
                anchorOrigin={position}
                onClose={() => onClose()}
                open={snackbarState.isSnackbarVisible}
                ClickAwayListenerProps={{
                    mouseEvent: false
                }}
                // action={action}
                TransitionComponent={Slide}
                autoHideDuration={autoHideDuration}
            >
                <Alert
                    severity={variant}
                    sx={{
                        minWidth: 300,
                        padding: `10px 20px`,
                        boxShadow: "0px 1px 4px 0px #0F172A0A",
                        border: "1px solid #B8BFFF",
                        background: "#F0F1FF",
                        "& .MuiAlert-message": {
                            color: "#8C8E9C",
                            fontSize: "14px"
                        },
                        "& .MuiAlertTitle-root": {
                            color: getColors(),
                            fontWeight: 600,
                            fontSize: "14px"
                        },
                        "& .MuiAlert-icon": {
                            color: getColors()
                        },
                        "& .MuiIconButton-root": {
                            color: "#94A3B8"
                        }
                    }}
                    onClose={() => {
                        onClose();
                    }}
                >
                    <AlertTitle>{snackbarState.snackBarMessage}</AlertTitle>
                    {snackbarState?.snackBarDescription || ""}
                </Alert>
            </Snackbar>
        </Backdrop>
    );
};

export default SnackbarMessage;
