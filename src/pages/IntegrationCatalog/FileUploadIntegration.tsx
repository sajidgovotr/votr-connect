import { Box, Container, Typography, TextField, Grid, Button, Stepper, Step, StepLabel, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const steps = ['Basic Info', 'Connection Details', 'Schedule', 'Review'];

interface BasicInfoProps {
    selectedEnvironment: string;
    onEnvironmentChange: (env: string) => void;
}

const BasicInfo = ({ selectedEnvironment, onEnvironmentChange }: BasicInfoProps) => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure File Upload Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up your file transfer integration
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Integration Name"
                    required
                    defaultValue="File Transfer Service"
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
                    label="Transfer Protocol"
                    defaultValue="sftp"
                >
                    <MenuItem value="sftp">SFTP</MenuItem>
                    <MenuItem value="ftp">FTP</MenuItem>
                    <MenuItem value="s3">Amazon S3</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    </Box>
);

const ConnectionDetails = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Connection Details
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure your file transfer connection settings
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Host"
                    required
                    defaultValue="sftp.example.com"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Port"
                    type="number"
                    required
                    defaultValue="22"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Username"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Remote Directory"
                    required
                    defaultValue="/uploads"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="File Pattern"
                    required
                    defaultValue="*.csv"
                    helperText="e.g., *.csv, data_*.txt"
                />
            </Grid>
        </Grid>
    </Box>
);

const Schedule = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Transfer Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up your file transfer schedule
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    select
                    label="Frequency"
                    defaultValue="daily"
                >
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    type="time"
                    label="Time (24h)"
                    defaultValue="00:00"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Retry Strategy"
                    defaultValue="3attempts"
                >
                    <MenuItem value="3attempts">3 attempts, 5 minutes apart</MenuItem>
                    <MenuItem value="5attempts">5 attempts, 10 minutes apart</MenuItem>
                    <MenuItem value="manual">Manual retry only</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    </Box>
);

const Review = ({ setActiveStep, selectedEnvironment }: { setActiveStep: (step: number) => void, selectedEnvironment: string }) => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Review Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Review your file transfer configuration
        </Typography>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Basic Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Name: File Transfer Service
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Environment: {selectedEnvironment.charAt(0).toUpperCase() + selectedEnvironment.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Protocol: SFTP
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(0)}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Connection Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Host: sftp.example.com:22
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Remote Directory: /uploads
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(1)}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Schedule
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Frequency: Daily at 00:00
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Retry Strategy: 3 attempts, 5 minutes apart
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveStep(2)}>Edit</Button>
        </Box>
    </Box>
);

const FileUploadIntegration = () => {
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
                return <ConnectionDetails />;
            case 2:
                return <Schedule />;
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
                    Configure File Upload Integration for {selectedProduct}
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

export default FileUploadIntegration; 