import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Grid, MenuItem, Button, Alert, CircularProgress } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthenticationRef, AuthFormData, authSchema } from './types';

const Authentication = forwardRef<AuthenticationRef, {}>((props, ref) => {
    const [testingAuth, setTestingAuth] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean, message: string } | null>(null);
    const [credentialsValidated, setCredentialsValidated] = useState(false);

    const { control, handleSubmit, watch, formState: { errors } } = useForm<AuthFormData>({
        resolver: yupResolver(authSchema),
        defaultValues: {
            authMethod: 'oauth2',
            grantType: 'client_credentials',
            scopes: 'read:shareholders'
        }
    });

    // Expose isValid method to parent components
    useImperativeHandle(ref, () => ({
        isValid: () => credentialsValidated
    }));

    const authMethod = watch('authMethod');
    const grantType = watch('grantType');

    const testAuthentication = async (data: AuthFormData) => {
        try {
            setTestingAuth(true);
            setTestResult(null);
            setCredentialsValidated(false);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulated success
            setTestResult({
                success: true,
                message: 'Authentication successful! Credentials validated.'
            });
            setCredentialsValidated(true);
        } catch (error) {
            setTestResult({
                success: false,
                message: 'Authentication failed. Please check your credentials.'
            });
            setCredentialsValidated(false);
        } finally {
            setTestingAuth(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(testAuthentication)}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Configure REST API Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Set up authentication for your REST API integration
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        name="authMethod"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select
                                label="Authentication Method"
                                error={!!errors.authMethod}
                                helperText={errors.authMethod?.message}
                            >
                                <MenuItem value="oauth2">OAuth 2.0</MenuItem>
                                <MenuItem value="apikey">API Key</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {authMethod === 'oauth2' && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            OAuth 2.0 Settings
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="grantType"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Grant Type"
                                            error={!!errors.grantType}
                                            helperText={errors.grantType?.message}
                                        >
                                            <MenuItem value="client_credentials">Client Credentials</MenuItem>
                                            <MenuItem value="authorization_code">Authorization Code</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="scopes"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Scopes (comma-separated)"
                                            error={!!errors.scopes}
                                            helperText={errors.scopes?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="tokenUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Token URL"
                                            required
                                            error={!!errors.tokenUrl}
                                            helperText={errors.tokenUrl?.message}
                                            defaultValue="https://api.yourplatform.com/oauth/token"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="clientId"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Client ID"
                                            required
                                            error={!!errors.clientId}
                                            helperText={errors.clientId?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="clientSecret"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type="password"
                                            label="Client Secret"
                                            required
                                            error={!!errors.clientSecret}
                                            helperText={errors.clientSecret?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            {grantType === 'authorization_code' && (
                                <>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="authUrl"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Authorization URL"
                                                    required
                                                    error={!!errors.authUrl}
                                                    helperText={errors.authUrl?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="redirectUri"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Redirect URI"
                                                    required
                                                    error={!!errors.redirectUri}
                                                    helperText={errors.redirectUri?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}

                {authMethod === 'apikey' && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            API Key Settings
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="headerName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Header Name"
                                            placeholder="e.g., X-API-Key or Authorization"
                                            required
                                            error={!!errors.headerName}
                                            helperText={errors.headerName?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="apiKeyValue"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type="password"
                                            label="API Key Value"
                                            required
                                            error={!!errors.apiKeyValue}
                                            helperText={errors.apiKeyValue?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={testingAuth}
                        sx={{ mt: 2 }}
                    >
                        {testingAuth ? (
                            <>
                                <CircularProgress size={16} sx={{ mr: 1 }} />
                                Testing Authentication...
                            </>
                        ) : 'Test Authentication'}
                    </Button>

                    {testResult && (
                        <Alert
                            severity={testResult.success ? "success" : "error"}
                            sx={{ mt: 2 }}
                        >
                            {testResult.message}
                        </Alert>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
});

export default Authentication; 