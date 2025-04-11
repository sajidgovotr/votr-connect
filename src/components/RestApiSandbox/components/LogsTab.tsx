import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router';
import CustomButton from '../../CustomButton';

interface Log {
    id: string;
    timestamp: string;
    method: string;
    endpoint: string;
    status: number;
    duration: string;
}

interface LogsTabProps {
    logs: Log[];
    filterValue: string;
    setFilterValue: (value: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalLogs: number;
    onViewDetails: () => void;
    onDownloadLogs: () => void;
}

const LogsTab = ({
    logs,
    filterValue,
    setFilterValue,
    currentPage,
    setCurrentPage,
    totalLogs,
    onViewDetails,
    onDownloadLogs
}: LogsTabProps) => {
    const navigate = useNavigate();

    const getStatusColor = (status: number) => {
        if (status === 200) return '#22C55E';
        if (status === 401) return '#F59E0B';
        return '#EF4444';
    };

    const getStatusBgColor = (status: number) => {
        if (status === 200) return '#ECFDF5';
        if (status === 401) return '#FEF3C7';
        return '#FEE2E2';
    };

    const handleRowClick = (logId: string) => {
        navigate(`/sandbox/rest-api/logs/${logId}`);
    };

    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            p: 4
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}
                >
                    API Call Logs
                </Typography>
                <TextField
                    select
                    size="small"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    sx={{
                        minWidth: 120,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            '& fieldset': { borderColor: '#E5E7EB' },
                            '&:hover fieldset': { borderColor: '#D1D5DB' },
                        },
                    }}
                >
                    <MenuItem value="All">Filter by: All</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                    <MenuItem value="Error">Error</MenuItem>
                </TextField>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Timestamp</TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Method</TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Endpoint</TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Status</TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log, index) => (
                        <TableRow
                            key={index}
                            onClick={() => handleRowClick(log.id)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: '#F9FAFB'
                                }
                            }}
                        >
                            <TableCell sx={{ pl: 0 }}>{log.timestamp}</TableCell>
                            <TableCell>{log.method}</TableCell>
                            <TableCell>{log.endpoint}</TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '16px',
                                        bgcolor: getStatusBgColor(log.status),
                                        color: getStatusColor(log.status),
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {log.status}
                                </Box>
                            </TableCell>
                            <TableCell>{log.duration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    Showing {(currentPage - 1) * 5 + 1}-{Math.min(currentPage * 5, totalLogs)} of {totalLogs} logs
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {[1, 2, 3].map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'contained' : 'outlined'}
                            onClick={() => setCurrentPage(page)}
                            sx={{
                                minWidth: '40px',
                                height: '40px',
                                p: 0,
                                borderColor: '#E5E7EB',
                                color: currentPage === page ? 'white' : '#374151',
                                bgcolor: currentPage === page ? '#3B82F6' : 'transparent',
                                '&:hover': {
                                    bgcolor: currentPage === page ? '#2563EB' : 'transparent',
                                    borderColor: '#D1D5DB',
                                },
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <CustomButton
                    variant="contained"
                    onClick={onViewDetails}
                    sx={{ color: 'white', textTransform: 'none' }}
                    title="View Details"
                />
                <Button
                    variant="outlined"
                    onClick={onDownloadLogs}
                    sx={{
                        borderColor: '#E5E7EB',
                        color: '#374151',
                        textTransform: 'none',
                        '&:hover': {
                            borderColor: '#D1D5DB',
                            bgcolor: 'transparent',
                        },
                    }}
                >
                    Download Logs
                </Button>
            </Box>
        </Box>
    );
};

export default LogsTab; 