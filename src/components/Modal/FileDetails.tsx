import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { formatFileSize, formatDate } from "@/utils/formatters";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

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

interface FileDetailsProps {
    open: boolean;
    onClose: () => void;
    file: FileUpload | null;
    fileData?: {
        data: Array<{
            id: string;
            rowNumber: number;
            data: Record<string, string>;
            csvUploadId: string;
            createdAt: string;
            updatedAt: string;
        }>;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
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

const FileDetails = ({ open, onClose, file, fileData }: FileDetailsProps) => {
    if (!file) return null;

    const headers = fileData?.data[0]?.data ? Object.values(fileData.data[0].data) : [];
    const rows = fileData?.data.slice(1) || [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }
            }}
        >
            <DialogTitle sx={{
                borderBottom: '1px solid #E5E7EB',
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                    File Details
                </Typography>
                <StatusChip status={file.status} />
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1F2937', mb: 2 }}>
                        File Information
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                Original Name
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                {file.originalName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                File Size
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                {formatFileSize(file.size)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                MIME Type
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                {file.mimeType}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                Upload Date
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                {formatDate(file.uploadDate)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                Rows Processed
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                {file.rowsProcessed}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {fileData && (
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1F2937', mb: 2 }}>
                            File Contents
                        </Typography>
                        <TableContainer component={Paper} sx={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            maxHeight: 400,
                            overflow: 'auto'
                        }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header, index) => (
                                            <TableCell
                                                key={index}
                                                sx={{
                                                    backgroundColor: '#F3F4F6',
                                                    color: '#1F2937',
                                                    fontWeight: 600,
                                                    borderBottom: '2px solid #E5E7EB',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {header}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: '#F9FAFB'
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#F3F4F6'
                                                }
                                            }}
                                        >
                                            {Object.values(row.data).map((cell, cellIndex) => (
                                                <TableCell
                                                    key={cellIndex}
                                                    sx={{
                                                        color: '#1F2937',
                                                        borderBottom: '1px solid #E5E7EB',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {cell}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{
                borderTop: '1px solid #E5E7EB',
                px: 3,
                py: 2
            }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2563EB'
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileDetails; 