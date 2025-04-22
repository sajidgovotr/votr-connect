import { Box, Container, Typography, TextField, Grid, MenuItem, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const steps = ['Basic Info', 'Authentication', 'Data Schema', 'Field Mapping', 'Review'];

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

export const DataSchema = () => (
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

export const FieldMapping = () => {
    const [mappings, setMappings] = useState([
        { sourceField: 'id', destinationField: 'shareholderId' },
        { sourceField: 'name', destinationField: 'fullName' }
    ]);

    const handleAddMapping = () => {
        setMappings([...mappings, { sourceField: '', destinationField: '' }]);
    };

    const handleMappingChange = (index: number, field: 'sourceField' | 'destinationField', value: string) => {
        const updatedMappings = [...mappings];
        updatedMappings[index][field] = value;
        setMappings(updatedMappings);
    };

    const handleDeleteMapping = (index: number) => {
        const updatedMappings = [...mappings];
        updatedMappings.splice(index, 1);
        setMappings(updatedMappings);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Configure Field Mapping
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Map your source fields to destination fields
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Source to Destination Mapping
                    </Typography>
                    <Box sx={{ p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB', mb: 2 }}>
                        {mappings.map((mapping, index) => (
                            <Grid container spacing={2} alignItems="center" sx={{ mb: index !== mappings.length - 1 ? 2 : 0 }} key={index}>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Source Field"
                                        value={mapping.sourceField}
                                        onChange={(e) => handleMappingChange(index, 'sourceField', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">→</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Destination Field"
                                        value={mapping.destinationField}
                                        onChange={(e) => handleMappingChange(index, 'destinationField', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteMapping(index)}
                                        disabled={mappings.length <= 1}
                                    >
                                        ✕
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Button variant="outlined" sx={{ mt: 1 }} onClick={handleAddMapping}>
                        + Add Field Mapping
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Transformation Rules
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="// Optional: Add transformation rules or logic"
                        sx={{ mb: 2 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

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
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Field Mapping
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                2 fields mapped with custom transformations
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(3)}>Edit</Button>
        </Box>
    </Box>
);

const RestApiIntegration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedEnvironment, setSelectedEnvironment] = useState('dev');
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        // Get environment and product from URL query params
        const params = new URLSearchParams(location.search);
        const envFromParams = params.get('environment');
        const productFromParams = params.get('product');

        if (envFromParams && ['dev', 'staging', 'prod'].includes(envFromParams)) {
            setSelectedEnvironment(envFromParams);
        }

        if (productFromParams) {
            setSelectedProduct(productFromParams);
        } else {
            // If no product is selected, redirect back to catalog
            navigate('/integration-catalog');
        }
    }, [location, navigate]);

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
                return <FieldMapping />;
            case 4:
                return <Review setActiveStep={setActiveStep} selectedEnvironment={selectedEnvironment} />;
            default:
                return <BasicInfo
                    selectedEnvironment={selectedEnvironment}
                    onEnvironmentChange={setSelectedEnvironment}
                />;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/integration-catalog')}
                    sx={{ mr: 2 }}
                >
                    Back to Catalog
                </Button>
                <Typography variant="h5" component="h1">
                    Configure REST API Integration for {selectedProduct}
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx={{ mt: 4 }}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        sx={{ mr: 1 }}
                        disabled={activeStep === 0}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (activeStep === steps.length - 1) {
                                navigate('/integration-catalog');
                            } else {
                                setActiveStep((prev) => prev + 1);
                            }
                        }}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RestApiIntegration; 