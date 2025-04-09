import { ViewIcon } from "@/assets/svgs/custom-icons";
import { IconButton, Stack, Typography } from "@mui/material";

const ViewButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Stack alignItems={"center"} justifyContent={"center"}>
            <IconButton
                size="small"
                onClick={() => {
                    onClick?.();
                }}
            >
                <ViewIcon />
            </IconButton>
            <Typography color="#84818A" fontSize={"12px"}>
                View
            </Typography>
        </Stack>
    );
};

export default ViewButton;
