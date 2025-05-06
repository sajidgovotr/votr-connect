import { Box, Typography, Paper, Stack, Divider } from "@mui/material";
import { formatDate } from "@/utils/formatters";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

interface Activity {
    id: string;
    type: 'upload' | 'download' | 'delete' | 'process';
    status: 'success' | 'error' | 'pending';
    fileName: string;
    timestamp: string;
    message?: string;
}

interface ActivitiesListProps {
    activities: Activity[];
}

const ActivityIcon = ({ type, status }: { type: Activity['type']; status: Activity['status'] }) => {
    const getIconConfig = () => {
        const baseConfig = {
            size: 20,
            color: status === 'success' ? '#059669' : status === 'error' ? '#DC2626' : '#D97706'
        };

        switch (type) {
            case 'upload':
                return { ...baseConfig, icon: <UploadIcon sx={{ fontSize: baseConfig.size, color: baseConfig.color }} /> };
            case 'download':
                return { ...baseConfig, icon: <DownloadIcon sx={{ fontSize: baseConfig.size, color: baseConfig.color }} /> };
            case 'delete':
                return { ...baseConfig, icon: <DeleteIcon sx={{ fontSize: baseConfig.size, color: baseConfig.color }} /> };
            case 'process':
                return { ...baseConfig, icon: <CheckCircleIcon sx={{ fontSize: baseConfig.size, color: baseConfig.color }} /> };
        }
    };

    const config = getIconConfig();

    return (
        <Box
            sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: status === 'success' ? '#D1FAE5' : status === 'error' ? '#FEE2E2' : '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${status === 'success' ? '#A7F3D0' : status === 'error' ? '#FECACA' : '#FDE68A'}`
            }}
        >
            {config.icon}
        </Box>
    );
};

const ActivitiesList = ({ activities }: ActivitiesListProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                height: '100%'
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                    Recent Activities
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
                    {activities.length} activities
                </Typography>
            </Box>

            <Stack spacing={2}>
                {activities.map((activity, index) => (
                    <Box key={activity.id}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <ActivityIcon type={activity.type} status={activity.status} />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" sx={{ color: '#1F2937', fontWeight: 500 }}>
                                    {activity.fileName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                                    {formatDate(activity.timestamp)}
                                </Typography>
                                {activity.message && (
                                    <Typography variant="caption" sx={{
                                        color: activity.status === 'error' ? '#DC2626' : '#059669',
                                        display: 'block',
                                        mt: 0.5
                                    }}>
                                        {activity.message}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        {index < activities.length - 1 && (
                            <Divider sx={{ mt: 2 }} />
                        )}
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

export default ActivitiesList; 