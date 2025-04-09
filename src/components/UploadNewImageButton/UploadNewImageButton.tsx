import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { UploadNewIcon } from "@/assets/svgs/custom-icons";
import React from "react";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1
});

interface UploadNewImageButtonProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadNewImageButton: React.FC<UploadNewImageButtonProps> = ({ onChange }) => {
    return (
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<UploadNewIcon />}
            size="small"
            sx={{ p: 0, fontWeight: 500 }}
        >
            Upload New
            <VisuallyHiddenInput type="file" onChange={onChange} />
        </Button>
    );
};

export default UploadNewImageButton;
