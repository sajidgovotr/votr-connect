import { Box, TextField, Typography, MenuItem } from "@mui/material";
import CustomButton from '../../CustomButton';

interface ConfigurationTabProps {
    baseUrl: string;
    setBaseUrl: (value: string) => void;
    authType: string;
    setAuthType: (value: string) => void;
    grantType: string;
    setGrantType: (value: string) => void;
    clientId: string;
    setClientId: (value: string) => void;
    clientSecret: string;
    setClientSecret: (value: string) => void;
    tokenUrl: string;
    setTokenUrl: (value: string) => void;
    onSave: () => void;
}

const ConfigurationTab = ({
    baseUrl,
    setBaseUrl,
    authType,
    setAuthType,
    grantType,
    setGrantType,
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    tokenUrl,
    setTokenUrl,
    onSave
}: ConfigurationTabProps) => {
    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            p: 4
        }}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 4
                }}
            >
                Endpoint Configuration
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                    Base URL
                </Typography>
                <TextField
                    fullWidth
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            '& fieldset': { borderColor: '#E5E7EB' },
                            '&:hover fieldset': { borderColor: '#D1D5DB' },
                        },
                    }}
                />
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 3
                }}
            >
                Authentication
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Authentication Type
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        value={authType}
                        onChange={(e) => setAuthType(e.target.value)}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    >
                        <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
                        <MenuItem value="API Key">API Key</MenuItem>
                    </TextField>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Grant Type
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        value={grantType}
                        onChange={(e) => setGrantType(e.target.value)}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    >
                        <MenuItem value="Client Credentials">Client Credentials</MenuItem>
                        <MenuItem value="Authorization Code">Authorization Code</MenuItem>
                    </TextField>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Client ID
                    </Typography>
                    <TextField
                        fullWidth
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Client Secret
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        value={clientSecret}
                        onChange={(e) => setClientSecret(e.target.value)}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                    Token URL
                </Typography>
                <TextField
                    fullWidth
                    value={tokenUrl}
                    onChange={(e) => setTokenUrl(e.target.value)}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            '& fieldset': { borderColor: '#E5E7EB' },
                            '&:hover fieldset': { borderColor: '#D1D5DB' },
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    variant="contained"
                    onClick={onSave}
                    sx={{ color: 'white', textTransform: 'none', px: 4 }}
                    title="Save"
                />
            </Box>
        </Box>
    );
};

export default ConfigurationTab; 