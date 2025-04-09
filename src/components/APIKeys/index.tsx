import { useState } from 'react';
import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningBanner from '../WarningBanner';

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

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#111827', fontSize: '1.125rem', fontWeight: 600 }}>
                    API Keys
                </Typography>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="environment-label">Environment</InputLabel>
                    <Select
                        labelId="environment-label"
                        value={environment}
                        label="Environment"
                        onChange={(e) => setEnvironment(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E7EB',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2563EB',
                            },
                        }}
                    >
                        <MenuItem value="production">Production</MenuItem>
                        <MenuItem value="staging">Staging</MenuItem>
                        <MenuItem value="development">Development</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <WarningBanner message="You are viewing production API keys. Be careful when sharing these." />

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
                            <Button
                                variant="contained"
                                onClick={() => handleCopy('jp_prod_client_1234567890abcdef')}
                                startIcon={<ContentCopyIcon />}
                                sx={{
                                    bgcolor: '#2563EB',
                                    '&:hover': { bgcolor: '#1D4ED8' },
                                    textTransform: 'none'
                                }}
                            >
                                Copy
                            </Button>
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
                            <Button
                                variant="contained"
                                onClick={() => setShowSecret(!showSecret)}
                                startIcon={showSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                sx={{
                                    bgcolor: '#2563EB',
                                    '&:hover': { bgcolor: '#1D4ED8' },
                                    textTransform: 'none'
                                }}
                            >
                                {showSecret ? 'Hide' : 'Show'}
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#DC2626' }}>
                            Warning: Regenerating keys will invalidate existing keys immediately
                        </Typography>
                        <Button
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
                        >
                            Regenerate API Keys
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default APIKeys; 