import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import { JSX } from "react";

interface CustomButtonProps extends ButtonProps {
    title?: string;
    icon?: JSX.Element;
}

const CustomButton = ({ title, icon, variant = "contained", sx, ...rest }: CustomButtonProps) => {
    const buttonContent = icon && title ? (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {icon}
            <Typography>{title}</Typography>
        </Stack>
    ) : icon ? icon : title;

    return (
        <Button
            {...rest}
            variant={variant}
            fullWidth={variant === "contained"}
            sx={{
                fontSize: "14px",
                fontWeight: 500,
                width: variant === "contained" ? "190px" : "auto",
                boxShadow: variant === "contained" ? "0px 3px 8px 0px #1A1A1A26" : "none",
                border: variant === "outlined" ? "1px solid #E6E6E9" : "none",
                "&.Mui-disabled": {
                    background: "#E6E6E9",
                    color: "#8C8E9C",
                },
                p: variant === "text" ? 0 : undefined,
                ...sx,
            }}
        >
            {buttonContent}
        </Button>
    );
};

export default CustomButton;
