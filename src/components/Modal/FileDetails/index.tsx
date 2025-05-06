import { Box, Typography, Grid, Chip, Divider, Paper } from "@mui/material";
import Modal from "../index";
import { formatFileSize, formatDate } from "@/utils/formatters";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

interface FileDetailsProps {
    open: boolean;
    onClose: () => void;
    file: {
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
    } | null;
}

const DetailItem = ({ label, value }: { label: string; value: string | number | null }) => {
    if (value === null) return null;

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#6B7280', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                {value}
            </Typography>
        </Box>
    );
};

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

const FileDetails = ({ open, onClose, file }: FileDetailsProps) => {
    if (!file) return null;

    return (
        <Modal open={open} onClose={onClose} maxWidth="md">
            <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                        File Details
                    </Typography>
                    <StatusChip status={file.status} />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Basic Information */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151', mb: 2 }}>
                            Basic Information
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DetailItem label="Original Name" value={file.originalName} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="File Name" value={file.fileName} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="File Type" value={file.mimeType} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="File Size" value={formatFileSize(file.size)} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Rows Processed" value={file.rowsProcessed} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Processing Information */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151', mb: 2 }}>
                            Processing Information
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Upload Date" value={formatDate(file.uploadDate)} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Status" value={file.status} />
                                </Grid>
                                {file.processingErrors && (
                                    <Grid item xs={12}>
                                        <DetailItem label="Processing Errors" value={file.processingErrors} />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <DetailItem label="File Path" value={file.path} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default FileDetails; 