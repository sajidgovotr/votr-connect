import { Box, Container, Typography, TextField, Grid, Button, Stepper, Step, StepLabel, Switch, FormControlLabel, Tabs, Tab, TextareaAutosize, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const steps = ['Basic Info', 'Schema Design', 'Security', 'Review'];

const BasicInfo = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure GraphQL Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up your integration with flexible GraphQL queries
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Integration Name"
                    required
                    defaultValue="GraphQL Financial Data API"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="GraphQL Endpoint"
                    required
                    defaultValue="https://api.yourplatform.com/graphql"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Introspection Enabled"
                />
            </Grid>
        </Grid>
    </Box>
);

const ManualEntry = () => (
    <TextareaAutosize
        minRows={10}
        placeholder="type Shareholder { id: ID! name: String! accountNumber: String! positions: [Position]! }\ntype Query { shareholders: [Shareholder]! }"
        style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}
    />
);

const ImportSchema = () => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/graphql': ['.graphql', '.gql'],
            'application/json': ['.json'],
            'text/plain': ['.txt']
        },
        onDrop: (acceptedFiles) => {
            console.log('Files:', acceptedFiles);
        },
    });

    return (
        <Box {...getRootProps()} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #E5E7EB', borderRadius: 1, p: 4, textAlign: 'center', bgcolor: '#F9FAFB' }}>
            <input {...getInputProps()} />
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                Drag and drop your GraphQL schema file here
            </Typography>
            <Button variant="contained" color="primary">Browse Files</Button>
            <Typography variant="caption" color="text.primary" sx={{ mt: 2 }}>
                Supported formats: .graphql, .gql, JSON (Apollo), SDL Text
            </Typography>
        </Box>
    );
};

const UseIntrospection = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Introspection Endpoint
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter the GraphQL endpoint URL to fetch schema via introspection
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="GraphQL Endpoint"
                    defaultValue="https://api.example.com/graphql"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">Fetch Schema</Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Authentication for Introspection
                </Typography>
                <TextareaAutosize
                    minRows={3}
                    placeholder='{"Authorization": "Bearer your-token-here"}'
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}
                />
            </Grid>
        </Grid>
        <Typography variant="caption" color="error" sx={{ mt: 2 }}>
            Note: The endpoint must have introspection enabled to fetch the schema
        </Typography>
    </Box>
);

const SchemaDesign = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Define Your GraphQL Schema
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose how to define your GraphQL schema:
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Manual Entry" />
                <Tab label="Import Schema" />
                <Tab label="Use Introspection" />
            </Tabs>
            {selectedTab === 0 && <ManualEntry />}
            {selectedTab === 1 && <ImportSchema />}
            {selectedTab === 2 && <UseIntrospection />}
        </Box>
    );
};

const Security = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure Security Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up security for your GraphQL endpoint
        </Typography>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Authentication
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Authentication Method</InputLabel>
                <Select defaultValue="Bearer Token">
                    <MenuItem value="Bearer Token">Bearer Token</MenuItem>
                    <MenuItem value="API Key">API Key</MenuItem>
                    <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Query Complexity Management
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Max Query Depth"
                        defaultValue="5"
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Max Query Cost"
                        defaultValue="1000"
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Rate Limit (requests/minute)"
                        defaultValue="100"
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Timeout (seconds)"
                        defaultValue="30"
                        type="number"
                    />
                </Grid>
            </Grid>
        </Box>
    </Box>
);

const Review = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Review and Finalize Your Integration Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Review and finalize your integration configuration
        </Typography>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Basic Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Name: GraphQL Financial Data API
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Endpoint: https://api.yourplatform.com/graphql
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Schema
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Types: Shareholder, Position
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Queries: shareholders
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Security
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Authentication: Bearer Token
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Query Limits: Depth 5, Cost 1000, Rate 100/min
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
    </Box>
);

const GraphQLIntegration = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <BasicInfo />;
            case 1:
                return <SchemaDesign />;
            case 2:
                return <Security />;
            case 3:
                return <Review />;
            default:
                return <BasicInfo />;
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
                    GraphQL Integration
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
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}>Previous</Button>
                        <Button variant="contained" color="primary" onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}>Next</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default GraphQLIntegration; 