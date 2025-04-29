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
import { DataSchema, FieldMapping } from '@/pages/IntegrationCatalog/RestApiIntegration';
import { useRestApiIntegrationMutation } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';

interface RestApiIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean) => void;
}

interface DataSchemaState {
    schemaName: string;
    endpoint: string;
    fields: Array<{
        name: string;
        type: string;
        required: boolean;
    }>;
}

interface FieldMappingState {
    sourceFields: Array<{
        name: string;
        type: string;
    }>;
    destinationFields: Array<{
        name: string;
        type: string;
    }>;
    mappings: Array<{
        source: string;
        destination: string;
    }>;
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
    // {
    //     label: 'Field Mapping',
    //     description: 'Map source fields to destination fields',
    // },
    {
        label: 'Review',
        description: 'Review your configuration before proceeding',
    },
];

const RestApiIntegrationSteps = ({ selectedProduct, onStepComplete }: RestApiIntegrationStepsProps) => {
    const [restApiIntegrationMutation, { isLoading: isRestApiIntegrationLoading }] = useRestApiIntegrationMutation();
    const { showSnackbar } = useMessage();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        integrationName: '',
        baseURL: '',
        method: 'GET',
        environment: 'dev',
        dataFormat: 'json',
        authMethod: 'apikey',
        apiKey: '',
        dataSchema: {
            schemaName: '',
            endpoint: '',
            fields: [],
        } as DataSchemaState,
        fieldMapping: {
            sourceFields: [],
            destinationFields: [],
            mappings: [],
        } as FieldMappingState,
    });

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            return await handleSubmit();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                return !!formData.authMethod && !!formData.apiKey;
            case 2:
                return !!formData.dataSchema.schemaName && formData.dataSchema.fields.length > 0;
            // case 3:
            //     return formData.fieldMapping.mappings.length > 0;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const handleDataSchemaChange = (newDataSchema: DataSchemaState) => {
        setFormData(prev => ({
            ...prev,
            dataSchema: newDataSchema
        }));
    };

    const handleFieldMappingChange = (newFieldMapping: FieldMappingState) => {
        setFormData(prev => ({
            ...prev,
            fieldMapping: newFieldMapping
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            name: formData.integrationName,
            environment: formData.environment,
            dataFormat: formData.dataFormat,
            method: formData.method,
            url: formData.baseURL,
            authentication: {
                authenticationType: formData.authMethod,
                apiKey: formData.apiKey,
            },
            schema: {
                resourceName: formData.dataSchema.schemaName,
                endpointPath: formData.dataSchema.endpoint,
                fieldDetails: formData.dataSchema.fields.map((field) => ({
                    name: field.name,
                    type: field.type,
                    isRequired: field.required,
                })),
            }
        }
        const response = await restApiIntegrationMutation(payload);
        if (response.error) {
            showSnackbar('Error', 'Failed to create integration', 'error', 10000);
        } else {
            showSnackbar('Success', 'Integration created successfully', 'success', 10000);
            onStepComplete(true);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }
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
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Base URL"
                                required
                                value={formData.baseURL}
                                onChange={handleInputChange('baseURL')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Method"
                                required
                                select
                                value={formData.method}
                                onChange={handleInputChange('method')}
                            >
                                <MenuItem value="GET">GET</MenuItem>
                                <MenuItem value="POST">POST</MenuItem>
                                <MenuItem value="PUT">PUT</MenuItem>
                                <MenuItem value="DELETE">DELETE</MenuItem>
                            </TextField>
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
                                {/* <MenuItem value="oauth2">OAuth 2.0</MenuItem> */}
                                <MenuItem value="apikey">API Key</MenuItem>
                            </TextField>
                        </Grid>
                        {
                            formData.authMethod === 'apikey' && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="API Key"
                                        value={formData.apiKey}
                                        onChange={handleInputChange('apiKey')}
                                    />
                                </Grid>
                            )}
                        {/* {formData.authMethod === 'oauth2' && (
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
                        )} */}
                    </Grid>
                );

            case 2:
                return (
                    <DataSchema
                        data={formData.dataSchema}
                        onChange={handleDataSchemaChange}
                    />
                );

            // case 3:
            //     return (
            //         <FieldMapping
            //             data={formData.fieldMapping}
            //             onChange={handleFieldMappingChange}
            //         />
            //     );

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
                        {/* {formData.authMethod === 'oauth2' && (
                            <>
                                <Typography variant="body2">
                                    Grant Type: {formData.grantType}
                                </Typography>
                                <Typography variant="body2">
                                    Token URL: {formData.tokenUrl}
                                </Typography>
                            </>
                        )} */}
                        <Typography variant="body2">
                            Data Schema: {formData.dataSchema.schemaName}
                        </Typography>
                        <Typography variant="body2">
                            Field Mappings: {formData.fieldMapping.mappings.length} mappings configured
                        </Typography>
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
                                    loading={isRestApiIntegrationLoading}
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