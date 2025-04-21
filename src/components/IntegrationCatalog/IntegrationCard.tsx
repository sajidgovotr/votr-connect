import { Box, Typography, Chip as MuiChip } from "@mui/material";
import { ChevronRight } from '@mui/icons-material';
import Chip from "../Chip";

interface IntegrationCardProps {
    title: string;
    description: string;
    onClick: ((environment: string) => void) | (() => void);
    configurationStatus?: {
        environment: 'dev' | 'staging' | 'prod';
        isConfigured: boolean;
    }[];
    isCustomIntegration?: boolean;
    isRecommended?: boolean;
    isSelected?: boolean;
    icon?: React.ReactNode;
}

const IntegrationCard = ({
    title,
    description,
    onClick,
    configurationStatus = [],
    isCustomIntegration = false,
    isRecommended = false,
    isSelected = false,
    icon
}: IntegrationCardProps) => {
    const isRestApi = title.includes('REST API');

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 3,
                px: 3,
                border: '1px solid',
                borderRadius: '12px',
                backgroundColor: isSelected ? '#f9fafb' : 'white',
                borderColor: isSelected ? '#e0e7ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: '#6366f1',
                    backgroundColor: isSelected ? '#f9fafb' : (isRestApi ? '#f5f7ff' : '#f8fafc'),
                },
                width: '100%'
            }}
            onClick={() => (onClick as () => void)()}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                {icon}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 500,
                                color: isSelected ? '#4f46e5' : '#111827'
                            }}
                        >
                            {title}
                        </Typography>
                        {isRecommended && (
                            <MuiChip
                                label="Recommended"
                                size="small"
                                sx={{
                                    bgcolor: '#dcfce7',
                                    color: '#15803d',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    height: '24px',
                                    borderRadius: '4px',
                                    ml: 1,
                                    px: 1
                                }}
                            />
                        )}
                        {configurationStatus.map(({ environment, isConfigured }) => (
                            isConfigured && (
                                <MuiChip
                                    key={environment}
                                    size="small"
                                    label={`${environment} configured`}
                                    sx={{
                                        bgcolor: '#dcfce7',
                                        color: '#15803d',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        height: '24px',
                                        borderRadius: '4px',
                                        ml: 1,
                                        px: 1
                                    }}
                                />
                            )
                        ))}
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: '#6b7280',
                            mt: 0.5,
                            fontWeight: 400
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>
            <ChevronRight sx={{ color: isSelected ? '#4f46e5' : '#9ca3af' }} />
        </Box>
    );
};

export default IntegrationCard; 