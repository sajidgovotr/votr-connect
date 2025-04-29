import { Box, Container, Typography, TextField, Grid, MenuItem, Button, Stepper, Step, StepLabel, FormControlLabel, Checkbox } from '@mui/material';
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

export const DataSchema = ({ data, onChange }: { data: DataSchemaState, onChange: (data: DataSchemaState) => void }) => {
    const handleChange = (field: keyof typeof data) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...data,
            [field]: event.target.value
        });
    };

    const handleFieldChange = (index: number, field: 'name' | 'type' | 'required', value: string | boolean) => {
        const updatedFields = [...data.fields];
        updatedFields[index] = {
            ...updatedFields[index],
            [field]: value
        };
        onChange({
            ...data,
            fields: updatedFields
        });
    };

    const handleAddField = () => {
        onChange({
            ...data,
            fields: [...data.fields, { name: '', type: 'string', required: false }]
        });
    };

    const handleDeleteField = (index: number) => {
        const updatedFields = [...data.fields];
        updatedFields.splice(index, 1);
        onChange({
            ...data,
            fields: updatedFields
        });
    };

    return (
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
                        label="Schema Name"
                        required
                        value={data.schemaName}
                        onChange={handleChange('schemaName')}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Endpoint"
                        value={data.endpoint}
                        onChange={handleChange('endpoint')}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Field Definitions
                    </Typography>
                    <Box sx={{ p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
                        {data.fields.map((field, index) => (
                            <Grid container spacing={2} alignItems="center" sx={{ mb: index !== data.fields.length - 1 ? 2 : 0 }} key={index}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Field Name"
                                        value={field.name}
                                        onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        label="Type"
                                        value={field.type}
                                        onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                    >
                                        <MenuItem value="string">String</MenuItem>
                                        <MenuItem value="number">Number</MenuItem>
                                        <MenuItem value="boolean">Boolean</MenuItem>
                                        <MenuItem value="object">Object</MenuItem>
                                        <MenuItem value="array">Array</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={field.required}
                                                onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                                            />
                                        }
                                        label="Required"
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteField(index)}
                                        disabled={data.fields.length <= 1}
                                    >
                                        ✕
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Button variant="outlined" sx={{ mt: 1 }} onClick={handleAddField}>
                        + Add Field
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export const FieldMapping = ({ data, onChange }: { data: FieldMappingState, onChange: (data: FieldMappingState) => void }) => {
    const handleMappingChange = (index: number, field: 'source' | 'destination', value: string) => {
        const updatedMappings = [...data.mappings];
        updatedMappings[index] = {
            ...updatedMappings[index],
            [field]: value
        };
        onChange({
            ...data,
            mappings: updatedMappings
        });
    };

    const handleAddMapping = () => {
        onChange({
            ...data,
            mappings: [...data.mappings, { source: '', destination: '' }]
        });
    };

    const handleDeleteMapping = (index: number) => {
        const updatedMappings = [...data.mappings];
        updatedMappings.splice(index, 1);
        onChange({
            ...data,
            mappings: updatedMappings
        });
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
                        {data.mappings.map((mapping, index) => (
                            <Grid container spacing={2} alignItems="center" sx={{ mb: index !== data.mappings.length - 1 ? 2 : 0 }} key={index}>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Source Field"
                                        value={mapping.source}
                                        onChange={(e) => handleMappingChange(index, 'source', e.target.value)}
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
                                        value={mapping.destination}
                                        onChange={(e) => handleMappingChange(index, 'destination', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteMapping(index)}
                                        disabled={data.mappings.length <= 1}
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
    const [dataSchema, setDataSchema] = useState<DataSchemaState>({
        schemaName: '',
        endpoint: '',
        fields: [],
    });
    const [fieldMapping, setFieldMapping] = useState<FieldMappingState>({
        sourceFields: [],
        destinationFields: [],
        mappings: [],
    });

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
                return <DataSchema
                    data={dataSchema}
                    onChange={setDataSchema}
                />;
            case 3:
                return <FieldMapping
                    data={fieldMapping}
                    onChange={setFieldMapping}
                />;
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