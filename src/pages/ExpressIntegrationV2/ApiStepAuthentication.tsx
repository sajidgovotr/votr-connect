import { Box, Button, Grid, MenuItem, TextField, Paper, Typography, InputAdornment, IconButton, Chip, ListItemIcon, ListItemText } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import React from 'react';

interface AuthValue {
    authMethod: string;
    apiKey: string;
    bearerToken: string;
    username: string;
    password: string;
    oauthClientId: string;
    oauthClientSecret: string;
    oauthTokenUrl: string;
    baseUrl?: string;
}

interface ApiStepAuthenticationProps {
    value: AuthValue;
    onChange: (val: AuthValue) => void;
    onNext: () => void;
    onBack: () => void;
}

const authMethods = [
    { value: 'api_key', label: 'API Key', icon: <VpnKeyIcon fontSize="small" /> },
    { value: 'bearer_token', label: 'Bearer Token', icon: <SecurityIcon fontSize="small" /> },
    { value: 'basic_auth', label: 'Basic Authentication', icon: <LockIcon fontSize="small" /> },
    { value: 'oauth2', label: 'OAuth 2.0', icon: <SecurityIcon fontSize="small" /> },
    { value: 'none', label: 'No Authentication', icon: <NoEncryptionIcon fontSize="small" /> },
];

const ApiStepAuthentication: React.FC<ApiStepAuthenticationProps> = ({ value, onChange, onNext, onBack }) => {
    const handlePaste = (key: keyof AuthValue) => {
        navigator.clipboard.readText().then(text => onChange({ ...value, [key]: text }));
    };

    const isFormValid = () => {
        switch (value.authMethod) {
            case 'api_key':
                return !!value.apiKey;
            case 'bearer_token':
                return !!value.bearerToken;
            case 'basic_auth':
                return !!value.username && !!value.password;
            case 'oauth2':
                return !!value.oauthClientId && !!value.oauthClientSecret && !!value.oauthTokenUrl;
            default:
                return true;
        }
    };

    const renderAuthFields = (): React.ReactNode => {
        switch (value.authMethod) {
            case 'api_key':
                return (
                    <Grid item xs={12}>
                        <Typography fontWeight={500} mb={1}>
                            API Key
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            type="password"
                            placeholder="********************"
                            value={value.apiKey}
                            onChange={e => onChange({ ...value, apiKey: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handlePaste('apiKey')} edge="end">
                                            <ContentPasteIcon />
                                            <Typography variant="caption" ml={0.5}>Paste</Typography>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                );
            case 'bearer_token':
                return (
                    <Grid item xs={12}>
                        <Typography fontWeight={500} mb={1}>
                            Bearer Token
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            type="password"
                            placeholder="********************"
                            value={value.bearerToken}
                            onChange={e => onChange({ ...value, bearerToken: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handlePaste('bearerToken')} edge="end">
                                            <ContentPasteIcon />
                                            <Typography variant="caption" ml={0.5}>Paste</Typography>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                );
            case 'basic_auth':
                return (
                    <>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500} mb={1}>
                                Username
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                placeholder="Enter username"
                                value={value.username}
                                onChange={e => onChange({ ...value, username: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500} mb={1}>
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                placeholder="Enter password"
                                value={value.password}
                                onChange={e => onChange({ ...value, password: e.target.value })}
                            />
                        </Grid>
                    </>
                );
            case 'oauth2':
                return (
                    <>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500} mb={1}>
                                Client ID
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                placeholder="Enter OAuth client ID"
                                value={value.oauthClientId}
                                onChange={e => onChange({ ...value, oauthClientId: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500} mb={1}>
                                Client Secret
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                placeholder="Enter OAuth client secret"
                                value={value.oauthClientSecret}
                                onChange={e => onChange({ ...value, oauthClientSecret: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontWeight={500} mb={1}>
                                Token URL
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                placeholder="https://auth.example.com/oauth/token"
                                value={value.oauthTokenUrl}
                                onChange={e => onChange({ ...value, oauthTokenUrl: e.target.value })}
                                helperText="URL where OAuth tokens can be obtained"
                            />
                        </Grid>
                    </>
                );
            default:
                return (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                            No authentication required for this API endpoint.
                        </Typography>
                    </Grid>
                );
        }
    };

    // Use the baseUrl from value, prefixed with http:// if present
    const apiUrl = value.baseUrl ? `http://${value.baseUrl}` : '';

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    width: 1,
                    p: 3,
                    borderRadius: 1,
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid #e0e0e0',
                    mt: 4,
                }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Authentication
                </Typography>
                {/* API URL Box */}
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        background: '#F4F7FE',
                        borderRadius: 2,
                        px: 2,
                        py: 2,
                        mb: 3,
                        border: '1px solid #E0E7EF',
                    }}
                >
                    <LanguageIcon sx={{ fontSize: 32, color: '#6366F1', mr: 2 }} />
                    <Typography variant="h6" fontWeight={500} color="#6366F1" sx={{ flex: 1 }}>
                        {apiUrl}
                    </Typography>
                    <Chip
                        label="Operational"
                        color="success"
                        size="small"
                        sx={{ ml: 2, fontWeight: 500, borderRadius: 1 }}
                        icon={<Box component="span" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>⏱️</Box>}
                    />
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography fontWeight={500} mb={1}>
                            Authentication Method
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={value.authMethod}
                            onChange={e => onChange({ ...value, authMethod: e.target.value })}
                            slotProps={{
                                select: {
                                    renderValue: (selected: unknown) => {
                                        const selectedValue = selected as string;
                                        const method = authMethods.find(m => m.value === selectedValue);
                                        return (
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {method?.icon}
                                                <span>{method?.label}</span>
                                            </Box>
                                        );
                                    }
                                }
                            }}
                        >
                            {authMethods.map(method => (
                                <MenuItem key={method.value} value={method.value}>
                                    {method.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {renderAuthFields()}
                </Grid>
            </Paper>
            <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
                <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
                <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={onNext} disabled={!isFormValid()}>Save & Continue</Button>
            </Box>
        </>
    );
};

export default ApiStepAuthentication; 