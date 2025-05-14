import { getRequiredChipsColor } from "@/utils/color-utils";
import { Box, SxProps, Typography } from "@mui/material";

interface Props {
    text: string;
    color: "Success" | "Danger" | "Warning";
    containerSx?: SxProps;
    sx?: SxProps;
}
//can be reusable
const RequiredChip = ({ text, color, sx, containerSx }: Props) => {

    return (
        <Box
            sx={{
                borderRadius: "2px",
                background: getRequiredChipsColor(color).background,
                display: "flex",
                padding: "0px 4px",
                justifyContent: "center",
                alignItems: "center",
                ...containerSx
            }}
        >
            <Typography
                fontWeight={500}
                fontSize={"9px"}
                sx={{ color: getRequiredChipsColor(color).color, ...sx }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default RequiredChip;
