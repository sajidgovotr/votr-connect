import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Stack, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImageUploadIcon, PlusBlue } from "@/assets/svgs/custom-icons";

type FileUploaderProps = {
    file: File | null;
    onChange: (img: File | null) => void;
    accept?: Record<string, string[]>;
    maxFiles?: number;
    maxSize?: number;
    height?: number;
    borderStyle?: string;
    infoPrev?: boolean;
};

const FileUploader: React.FC<FileUploaderProps> = ({
    file,
    onChange,
    accept = { "image/jpeg": [], "image/png": [], "image/gif": [] },
    maxFiles = 1,
    maxSize = 2 * 1024 * 1024,
    height = 160,
    borderStyle = "dashed",
    infoPrev = false,
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            onChange(
                Object.assign(selectedFile, {
                    preview: URL.createObjectURL(selectedFile),
                })
            );
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles,
        maxSize,
    });

    const removeFile = () => onChange(null);

    const renderPlaceholder = () => {
        if (isDragActive) {
            return <Typography color="primary" fontWeight={475} fontSize={14}>Drop your file now!</Typography>;
        }

        if (infoPrev) {
            return (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PlusBlue />
                    <Typography fontSize={14} fontWeight={475} color="#5263FF">
                        Offer / Promotion / Early Access Preview
                    </Typography>
                </Stack>
            );
        }

        return (
            <Typography fontWeight={475} fontSize={14}>
                Drag & drop files or <span className="text-primaryMain">browse files</span>
            </Typography>
        );
    };

    return (
        <Box
            {...getRootProps()}
            sx={{
                background: file ? `url(${(file as any).preview})` : "",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                border: `1px ${borderStyle} #DBDFFF`,
                height,
                borderRadius: "8px",
                position: "relative",
                cursor: "pointer",
            }}
        >
            <input {...getInputProps()} data-testid="file-input" />
            {!file ? (
                <Stack
                    sx={{ width: "100%", height: "100%", background: isDragActive ? "#f0f1ff" : "" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    {!infoPrev && <Box mb={0.5}><ImageUploadIcon /></Box>}
                    {renderPlaceholder()}
                    <Typography fontWeight={400} color="#8C8E9C" fontSize={12} mt={0.5}>
                        JPG, PNG, or GIF - Max file size {maxSize / 1024 / 1024}MB
                    </Typography>
                </Stack>
            ) : (
                <Button
                    onClick={removeFile}
                    color="secondary"
                    variant="contained"
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "primary.dark",
                        color: "white",
                        borderRadius: "50%",
                        minWidth: 30,
                        minHeight: 30,
                        zIndex: 10,
                    }}
                >
                    <CloseIcon sx={{ fontSize: 16 }} />
                </Button>
            )}
        </Box>
    );
};

export default FileUploader;
