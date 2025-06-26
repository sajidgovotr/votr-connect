import { Box, Card, Typography, Chip, Stack, styled, Tooltip } from '@mui/material';
import { useGetIntegrationMethodsQuery } from '@/services/express-integration';
import { getIcon } from '@/utils/iconMap';
import { ChevronRight } from '@mui/icons-material';

interface IntegrationTypeProps {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    onStepComplete: (type: string, completed: boolean) => void;
    onNext: () => void;
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

const IntegrationType = ({
    selectedType,
    onTypeSelect,
    onStepComplete,
    onNext,
}: IntegrationTypeProps) => {
    const { data: methodsResponse, isLoading, error } = useGetIntegrationMethodsQuery();

    if (isLoading) {
        return <Typography>Loading integration methods...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error loading integration methods</Typography>;
    }

    const handleTypeSelect = (code: string) => {
        onTypeSelect(code);
        onStepComplete(code, true);
        onNext();
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Select Integration Type
            </Typography>
            <Stack spacing={2}>
                {methodsResponse?.data
                    ?.slice()
                    .sort((a, b) => {
                        const statusOrder = {
                            Recommended: 0,
                            Default: 1,
                            ComingSoon: 2,
                        };
                        return statusOrder[a.status] - statusOrder[b.status];
                    })
                    .map((type) => {
                        const Icon = getIcon(type.iconKey);
                        const isFirst = type.code === 'restapi';
                        const isSelected = selectedType === type.code;
                        const isDisabled = type.status === 'ComingSoon';

                        const card = (
                            <StyledCard
                                key={type.id}
                                onClick={() => !isDisabled && handleTypeSelect(type.code)}
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
                                        <Box sx={{
                                            color: isSelected ? '#4f46e5' : (isDisabled ? '#9ca3af' : '#6366f1'),
                                            fontSize: 26,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Icon />
                                        </Box>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: isSelected ? '#4f46e5' : (isDisabled ? '#9ca3af' : '#111827')
                                                    }}
                                                >
                                                    {type.methodName}
                                                </Typography>
                                                {type.status === 'Recommended' && (
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
                                                {type.status === 'ComingSoon' && (
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