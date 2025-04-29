import { Box, Typography, Card, Stack, Chip, Tooltip } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import exact icons that match the image
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

interface IntegrationTypeProps {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    selectedProduct: string;
    onStepComplete?: (type: string, completed: boolean) => void;
    onNext?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
    padding: 0,
    marginBottom: theme.spacing(2),
    borderRadius: '12px',
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

const integrationTypes = [
    {
        id: 'rest-api',
        title: 'REST API (Pull Model)',
        description: 'VOTR pulls daily shareholder position data from your API',
        icon: RouterOutlinedIcon,
        recommended: true,
        disabled: false
    },
    {
        id: 'file-upload',
        title: 'SFTP File Transfer',
        description: 'Upload daily position files to VOTR Connect\'s SFTP server',
        icon: UploadOutlinedIcon,
        recommended: false,
        disabled: false
    },
    {
        id: 'database',
        title: 'Direct Database Connection',
        description: 'Connect directly to your database (Advanced)',
        icon: StorageOutlinedIcon,
        recommended: false,
        disabled: true
    },
    {
        id: 'custom',
        title: 'Request Custom Integration',
        description: 'Need a different integration method? Let us know your requirements',
        icon: BuildOutlinedIcon,
        recommended: false,
        disabled: true
    }
];

const IntegrationType = ({ selectedType, onTypeSelect, onNext }: IntegrationTypeProps) => {
    const handleSelect = (typeId: string, disabled: boolean) => {
        if (disabled) return;

        onTypeSelect(typeId);
        if (onNext) {
            onNext();
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ fontSize: '24px', color: '#111827', fontWeight: 600, mb: 3 }}>
                Choose Integration Method
            </Typography>

            <Stack spacing={2}>
                {integrationTypes.map((type) => {
                    const Icon = type.icon;
                    const isFirst = type.id === 'rest-api';
                    const isSelected = selectedType === type.id;
                    const isDisabled = type.disabled;

                    const card = (
                        <StyledCard
                            key={type.id}
                            onClick={() => handleSelect(type.id, isDisabled)}
                            sx={{
                                backgroundColor: isFirst ? '#f5f7ff' : (isSelected ? '#f9fafb' : 'white'),
                                border: '1px solid',
                                borderColor: isSelected ? '#4f46e5' : (isFirst ? '#e0e7ff' : '#e6e6e9'),
                                opacity: isDisabled ? 0.6 : 1,
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                '&:hover': {
                                    borderColor: isDisabled ? '#e6e6e9' : theme => theme.palette.primary.main,
                                },
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                py: 3,
                                px: 3,
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                    <Icon
                                        sx={{
                                            color: isSelected ? '#4f46e5' : (isDisabled ? '#9ca3af' : '#6366f1'),
                                            fontSize: 26
                                        }}
                                    />
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 500,
                                                    color: isSelected ? '#4f46e5' : (isDisabled ? '#9ca3af' : '#111827')
                                                }}
                                            >
                                                {type.title}
                                            </Typography>
                                            {type.recommended && (
                                                <Chip
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
                                            {isDisabled && (
                                                <Chip
                                                    label="Coming Soon"
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#f3f4f6',
                                                        color: '#4b5563',
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem',
                                                        height: '24px',
                                                        borderRadius: '4px',
                                                        ml: 1,
                                                        px: 1
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color: isDisabled ? '#9ca3af' : '#6b7280',
                                                mt: 0.5,
                                                fontWeight: 400
                                            }}
                                        >
                                            {type.description}
                                        </Typography>
                                    </Box>
                                </Box>
                                <ChevronRight sx={{ color: isSelected ? '#4f46e5' : (isDisabled ? '#d1d5db' : '#9ca3af') }} />
                            </Box>
                        </StyledCard>
                    );

                    return isDisabled ? (
                        <Tooltip title="Coming soon" key={type.id}>
                            <Box sx={{ cursor: 'not-allowed' }}>
                                {card}
                            </Box>
                        </Tooltip>
                    ) : card;
                })}
            </Stack>
        </Box>
    );
};

export default IntegrationType; 