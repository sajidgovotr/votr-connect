import { CardProps } from "@/types/proptype";
import { Box } from "@mui/material";
import { JSX } from "react";

const Card = ({
    children,
    className,
    onClick,
    dataTestId,
}: CardProps): JSX.Element => {
    return (
        <Box
            className={`rounded-lg !p-4 bg-muted border border-cardBorder shadow-card ${className}`}
            onClick={() => onClick?.()}
            data-testid={dataTestId || "box"}
        >
            {children}
        </Box>
    );
};

export default Card;
