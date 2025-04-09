import { CopyIcon } from "@/assets/svgs/custom-icons";
import { Stack, Tooltip } from "@mui/material";

const CopyButton = () => {
    return (
        <Tooltip title="Copy">
            <Stack
                sx={{
                    width: "46px",
                    height: "42px",
                    border: "1px solid #E6E6E9",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.5",
                    "&:hover": {
                        borderColor: "#5263FF"
                    }
                }}
                alignItems={"center"}
                justifyContent={"center"}
                role="button"
                tabIndex={0}
                data-testid="copy-button"
            >
                <CopyIcon />
            </Stack>
        </Tooltip>
    );
};

export default CopyButton;
