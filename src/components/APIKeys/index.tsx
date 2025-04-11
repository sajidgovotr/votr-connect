import { useState } from 'react';
import { Box, Card, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningBanner from '../WarningBanner';
import CustomButton from '../CustomButton';
import SelectBox from '../SelectBox';

const APIKeys = () => {
    const [environment, setEnvironment] = useState('production');
    const [showSecret, setShowSecret] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    const handleRegenerateKeys = () => {
        // Add key regeneration logic here
        console.log('Regenerating API keys...');
    };

    const environmentOptions = [
        { value: 'production', label: 'Production' },
        { value: 'staging', label: 'Staging' },
        { value: 'development', label: 'Development' }
    ];

    const getWarningMessage = () => {
        switch (environment) {
            case 'production':
                return 'You are viewing production API keys. Be careful when sharing these.';
            case 'staging':
                return 'You are viewing staging API keys.';
            case 'development':
                return 'You are viewing development API keys.';
            default:
                return '';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#111827', fontSize: '1.125rem', fontWeight: 600 }}>
                    API Keys
                </Typography>
                <Box sx={{ minWidth: 200 }}>
                    <SelectBox
                        value={environment}
                        options={environmentOptions}
                        handleChangeValue={(value) => setEnvironment(value)}
                        placeholder="Select Environment"
                    />
                </Box>
            </Box>

            <WarningBanner message={getWarningMessage()} />

            <Card sx={{ mt: 3 }}>
                <Box sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 3
                        }}
                    >
                        REST API Keys
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mb: 1 }}>
                            Client ID
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    bgcolor: '#F9FAFB',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 1,
                                    fontSize: '0.875rem',
                                    color: '#111827',
                                    fontFamily: 'monospace'
                                }}
                            >
                                jp_prod_client_1234567890abcdef
                            </Typography>
                            <CustomButton
                                variant="contained"
                                onClick={() => handleCopy('jp_prod_client_1234567890abcdef')}
                                startIcon={<ContentCopyIcon />}
                                sx={{
                                    bgcolor: '#2563EB',
                                    '&:hover': { bgcolor: '#1D4ED8' },
                                    textTransform: 'none'
                                }}
                                title='Copy'
                            />

                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', mb: 1 }}>
                            Client Secret
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    bgcolor: '#F9FAFB',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 1,
                                    fontSize: '0.875rem',
                                    color: '#111827',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {showSecret ? 'sk_prod_secret_key_here' : '••••••••••••••••••••••••'}
                            </Typography>
                            <CustomButton
                                variant="contained"
                                onClick={() => setShowSecret(!showSecret)}
                                startIcon={showSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                sx={{
                                    bgcolor: '#2563EB',
                                    '&:hover': { bgcolor: '#1D4ED8' },
                                    textTransform: 'none'
                                }}
                                title={showSecret ? 'Hide' : 'Show'}
                            />


                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#DC2626' }}>
                            Warning: Regenerating keys will invalidate existing keys immediately
                        </Typography>
                        <CustomButton
                            variant="outlined"
                            color="error"
                            onClick={handleRegenerateKeys}
                            sx={{
                                borderColor: '#DC2626',
                                color: '#DC2626',
                                '&:hover': {
                                    borderColor: '#B91C1C',
                                    bgcolor: 'rgba(220, 38, 38, 0.04)'
                                },
                                textTransform: 'none'
                            }}
                            title='Regenerate API Keys'
                        >

                        </CustomButton>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default APIKeys; 