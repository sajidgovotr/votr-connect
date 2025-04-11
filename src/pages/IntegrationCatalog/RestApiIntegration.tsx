import { Box, Container, Typography, TextField, Grid, MenuItem, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const steps = ['Basic Info', 'Authentication', 'Data Schema', 'Review'];

interface BasicInfoProps {
    selectedEnvironment: string;
    onEnvironmentChange: (env: string) => void;
}

const BasicInfo = ({ selectedEnvironment, onEnvironmentChange }: BasicInfoProps) => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure REST API Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up your integration to receive data via REST API endpoints
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Integration Name"
                    required
                    defaultValue="Shareholder Data Sync"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    select
                    label="Environment"
                    value={selectedEnvironment}
                    onChange={(e) => onEnvironmentChange(e.target.value)}
                    required
                >
                    <MenuItem value="dev">Development</MenuItem>
                    <MenuItem value="staging">Staging</MenuItem>
                    <MenuItem value="prod">Production</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    select
                    label="Data Format"
                    defaultValue="json"
                >
                    <MenuItem value="json">JSON</MenuItem>
                    <MenuItem value="xml">XML</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    select
                    label="Update Frequency"
                    defaultValue="daily"
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Endpoint Base URL"
                    required
                    defaultValue="https://api.yourplatform.com/v1"
                />
            </Grid>
        </Grid>
    </Box>
);

const Authentication = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure REST API Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up authentication for your REST API integration
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Authentication Method"
                    defaultValue="oauth2"
                >
                    <MenuItem value="oauth2">OAuth 2.0</MenuItem>
                    <MenuItem value="apikey">API Key</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    OAuth 2.0 Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            label="Grant Type"
                            defaultValue="client_credentials"
                        >
                            <MenuItem value="client_credentials">Client Credentials</MenuItem>
                            <MenuItem value="authorization_code">Authorization Code</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Scopes"
                            defaultValue="read:shareholders"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Token URL"
                            required
                            defaultValue="https://api.yourplatform.com/oauth/token"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
);

const DataSchema = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure REST API Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Define the data schema for your integration
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Resource Name"
                    required
                    defaultValue="Shareholders"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Endpoint Path"
                    required
                    defaultValue="/shareholders"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Field Definitions
                </Typography>
                <Box sx={{ p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>id</strong> (string, required): Unique identifier
                    </Typography>
                    <Typography variant="body2">
                        <strong>name</strong> (string, required): Shareholder's full name
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
);

const Review = ({ setActiveStep, selectedEnvironment }: { setActiveStep: (step: number) => void, selectedEnvironment: string }) => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Review Your Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please review the information below and make any necessary changes.
        </Typography>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Basic Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Name: Shareholder Data Sync
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Environment: {selectedEnvironment.charAt(0).toUpperCase() + selectedEnvironment.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Base URL: https://api.yourplatform.com/v1
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(0)}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Authentication
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Method: OAuth 2.0 (Client Credentials)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Token URL: https://api.yourplatform.com/oauth/token
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(1)}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Data Schema
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Resource: Shareholders (/shareholders)
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(2)}>Edit</Button>
        </Box>
    </Box>
);

const RestApiIntegration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedEnvironment, setSelectedEnvironment] = useState('dev');

    useEffect(() => {
        // Get environment from URL query params
        const params = new URLSearchParams(location.search);
        const envFromParams = params.get('environment');
        if (envFromParams && ['dev', 'staging', 'prod'].includes(envFromParams)) {
            setSelectedEnvironment(envFromParams);
        }
    }, [location]);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <BasicInfo
                    selectedEnvironment={selectedEnvironment}
                    onEnvironmentChange={setSelectedEnvironment}
                />;
            case 1:
                return <Authentication />;
            case 2:
                return <DataSchema />;
            case 3:
                return <Review setActiveStep={setActiveStep} selectedEnvironment={selectedEnvironment} />;
            default:
                return <BasicInfo
                    selectedEnvironment={selectedEnvironment}
                    onEnvironmentChange={setSelectedEnvironment}
                />;
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Button
                    variant="text"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBack />}
                    sx={{ mb: 3, color: '#1F2937', '&:hover': { color: '#5263FF' } }}
                >
                    Back
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    REST API Integration
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ p: 4, borderRadius: 2, border: '1px solid #E5E7EB', bgcolor: '#FFFFFF', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)' }}>
                    {renderStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            variant="outlined"
                            sx={{ mr: 2 }}
                            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                            disabled={activeStep === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RestApiIntegration; 