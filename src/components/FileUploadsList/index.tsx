import { Box, Typography, Paper, Chip, Stack, IconButton, Tooltip } from "@mui/material";
import { formatFileSize, formatDate } from "@/utils/formatters";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { useState } from "react";
import { useGetCSVfileDataQuery } from "@/services/express-integration";
import FileDetails from "../Modal/FileDetails";

interface FileUpload {
    id: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    uploadDate: string;
    status: string;
    processingErrors: string | null;
    fileIntegrationId: string | null;
    rowsProcessed: number;
}

interface FileUploadsListProps {
    files: FileUpload[];
    onViewFile?: (file: FileUpload) => void;
    onDownloadFile?: (file: FileUpload) => void;
}

const StatusChip = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processed':
                return {
                    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
                    color: '#059669',
                    bgColor: '#D1FAE5',
                    borderColor: '#A7F3D0'
                };
            case 'error':
                return {
                    icon: <ErrorIcon sx={{ fontSize: 16 }} />,
                    color: '#DC2626',
                    bgColor: '#FEE2E2',
                    borderColor: '#FECACA'
                };
            default:
                return {
                    icon: <PendingIcon sx={{ fontSize: 16 }} />,
                    color: '#D97706',
                    bgColor: '#FEF3C7',
                    borderColor: '#FDE68A'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Chip
            icon={config.icon}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
                backgroundColor: config.bgColor,
                color: config.color,
                border: `1px solid ${config.borderColor}`,
                fontWeight: 500,
                fontSize: '0.75rem',
                height: '24px',
                '& .MuiChip-label': {
                    px: 1
                },
                '& .MuiChip-icon': {
                    color: config.color
                }
            }}
        />
    );
};

const FileUploadsList = ({ files }: FileUploadsListProps) => {
    const [selectedFile, setSelectedFile] = useState<FileUpload | null>(null);
    const { data: fileData } = useGetCSVfileDataQuery(selectedFile?.id || '', { skip: !selectedFile?.id });

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                    Recent File Uploads
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
                    {files.length} files uploaded
                </Typography>
            </Box>

            <Stack spacing={2}>
                {files.map((file) => (
                    <Paper
                        key={file.id}
                        elevation={0}
                        sx={{
                            p: 2,
                            backgroundColor: '#F9FAFB',
                            borderRadius: '6px',
                            border: '1px solid #E5E7EB',
                            '&:hover': {
                                backgroundColor: '#F3F4F6',
                                borderColor: '#D1D5DB'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ color: '#1F2937', fontWeight: 500, mb: 0.5 }}>
                                    {file.originalName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                    {formatFileSize(file.size)} • {file.mimeType}
                                </Typography>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <StatusChip status={file.status} />
                                <Tooltip title="View Details">
                                    <IconButton
                                        size="small"
                                        onClick={() => setSelectedFile(file)}
                                        sx={{ color: '#6B7280' }}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                {/* <Tooltip title="Download">
                                    <IconButton
                                        size="small"
                                        onClick={() => onDownloadFile?.(file)}
                                        sx={{ color: '#6B7280' }}
                                    >
                                        <DownloadIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip> */}
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                Uploaded: {formatDate(file.uploadDate)}
                            </Typography>
                            {file.rowsProcessed > 0 && (
                                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                    Rows Processed: {file.rowsProcessed}
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                ))}
            </Stack>

            <FileDetails
                open={!!selectedFile}
                onClose={() => setSelectedFile(null)}
                file={selectedFile}
                fileData={fileData}
            />
        </Paper>
    );
};

export default FileUploadsList; 