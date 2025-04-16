import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField,
    MenuItem,
    Button,
    Grid,
} from '@mui/material';
import { DataSchema } from '@/pages/IntegrationCatalog/RestApiIntegration';

interface RestApiIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean) => void;
}

const steps = [
    {
        label: 'Basic Info',
        description: 'Configure basic settings for your REST API integration',
    },
    {
        label: 'Authentication',
        description: 'Set up authentication for your REST API integration',
    },
    {
        label: 'Data Schema',
        description: 'Define the data structure for your integration',
    },
    {
        label: 'Review',
        description: 'Review your configuration before proceeding',
    },
];

const RestApiIntegrationSteps = ({ selectedProduct, onStepComplete }: RestApiIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        integrationName: '',
        environment: 'dev',
        dataFormat: 'json',
        authMethod: 'oauth2',
        grantType: 'client_credentials',
        scopes: '',
        tokenUrl: '',
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            onStepComplete(true);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleInputChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return !!formData.integrationName && !!formData.environment;
            case 1:
                return !!formData.authMethod && !!formData.tokenUrl;
            case 2:
                return true;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Integration Name"
                                required
                                value={formData.integrationName}
                                onChange={handleInputChange('integrationName')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Environment"
                                value={formData.environment}
                                onChange={handleInputChange('environment')}
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
                                value={formData.dataFormat}
                                onChange={handleInputChange('dataFormat')}
                            >
                                <MenuItem value="json">JSON</MenuItem>
                                <MenuItem value="xml">XML</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Authentication Method"
                                value={formData.authMethod}
                                onChange={handleInputChange('authMethod')}
                            >
                                <MenuItem value="oauth2">OAuth 2.0</MenuItem>
                                <MenuItem value="apikey">API Key</MenuItem>
                            </TextField>
                        </Grid>
                        {formData.authMethod === 'oauth2' && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Grant Type"
                                        value={formData.grantType}
                                        onChange={handleInputChange('grantType')}
                                    >
                                        <MenuItem value="client_credentials">Client Credentials</MenuItem>
                                        <MenuItem value="authorization_code">Authorization Code</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Scopes"
                                        value={formData.scopes}
                                        onChange={handleInputChange('scopes')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Token URL"
                                        required
                                        value={formData.tokenUrl}
                                        onChange={handleInputChange('tokenUrl')}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                );

            case 2:
                return (
                    <DataSchema />
                );

            case 3:
                return (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Configuration Summary
                        </Typography>
                        <Typography variant="body2">
                            Integration Name: {formData.integrationName}
                        </Typography>
                        <Typography variant="body2">
                            Environment: {formData.environment}
                        </Typography>
                        <Typography variant="body2">
                            Authentication Method: {formData.authMethod}
                        </Typography>
                        {formData.authMethod === 'oauth2' && (
                            <>
                                <Typography variant="body2">
                                    Grant Type: {formData.grantType}
                                </Typography>
                                <Typography variant="body2">
                                    Token URL: {formData.tokenUrl}
                                </Typography>
                            </>
                        )}
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Configure REST API Integration for {selectedProduct}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            <Typography variant="subtitle1">{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                {step.description}
                            </Typography>
                            {renderStepContent(index)}
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={!isStepValid(index)}
                                >
                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default RestApiIntegrationSteps; 