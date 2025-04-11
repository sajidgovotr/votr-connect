import { Box, Container, Typography, TextField, Grid, Button, Stepper, Step, StepLabel, Switch, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import TimePicker from '@/components/TimePicker';

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
                    File Upload Integration
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

export default FileUploadIntegration; 