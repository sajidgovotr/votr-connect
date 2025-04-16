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

interface GraphQLIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean) => void;
}

const steps = [
    {
        label: 'Basic Info',
        description: 'Configure basic settings for your GraphQL integration',
    },
    {
        label: 'Schema Design',
        description: 'Define your GraphQL schema and types',
    },
    {
        label: 'Security',
        description: 'Configure security settings for your GraphQL endpoint',
    },
    {
        label: 'Review',
        description: 'Review your configuration before proceeding',
    },
];

const GraphQLIntegrationSteps = ({ selectedProduct, onStepComplete }: GraphQLIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        integrationName: '',
        environment: 'dev',
        endpoint: '',
        schemaDefinition: '',
        authMethod: 'jwt',
        jwtSecret: '',
        allowIntrospection: true,
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
                return !!formData.integrationName && !!formData.environment && !!formData.endpoint;
            case 1:
                return !!formData.schemaDefinition;
            case 2:
                return !!formData.authMethod && (formData.authMethod !== 'jwt' || !!formData.jwtSecret);
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="GraphQL Endpoint"
                                required
                                value={formData.endpoint}
                                onChange={handleInputChange('endpoint')}
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={8}
                                label="Schema Definition"
                                required
                                value={formData.schemaDefinition}
                                onChange={handleInputChange('schemaDefinition')}
                                placeholder="type Query {
    example: String
}"
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
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
                                <MenuItem value="jwt">JWT</MenuItem>
                                <MenuItem value="apikey">API Key</MenuItem>
                                <MenuItem value="none">No Authentication</MenuItem>
                            </TextField>
                        </Grid>
                        {formData.authMethod === 'jwt' && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="JWT Secret"
                                    required
                                    type="password"
                                    value={formData.jwtSecret}
                                    onChange={handleInputChange('jwtSecret')}
                                />
                            </Grid>
                        )}
                    </Grid>
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
                            GraphQL Endpoint: {formData.endpoint}
                        </Typography>
                        <Typography variant="body2">
                            Authentication Method: {formData.authMethod}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Schema Preview:
                        </Typography>
                        <Box
                            component="pre"
                            sx={{
                                p: 2,
                                bgcolor: 'grey.100',
                                borderRadius: 1,
                                overflow: 'auto',
                                maxHeight: 200,
                            }}
                        >
                            {formData.schemaDefinition}
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Configure GraphQL Integration for {selectedProduct}
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

export default GraphQLIntegrationSteps; 