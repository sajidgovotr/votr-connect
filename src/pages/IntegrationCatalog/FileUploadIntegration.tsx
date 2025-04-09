import { Box, Container, Typography, TextField, Grid, Button, Stepper, Step, StepLabel, Switch, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import TimePicker from '@/components/TimePicker';

const steps = ['File Settings', 'Connection', 'Schedule', 'Review'];

const FileSettings = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure File Upload Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up scheduled file transfers via SFTP/FTPS
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Integration Name"
                    required
                    defaultValue="Daily Shareholder File Upload"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>File Format</InputLabel>
                    <Select defaultValue="CSV">
                        <MenuItem value="CSV">CSV</MenuItem>
                        <MenuItem value="Excel">Excel</MenuItem>
                        <MenuItem value="JSON">JSON</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="File Naming Pattern"
                    defaultValue="shareholders_YYYYMMDD"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Include Header Row"
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">Upload Sample</Button>
            </Grid>
        </Grid>
    </Box>
);

const SFTPSettings = () => (
    <Grid container spacing={3}>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Host"
                required
                defaultValue="sftp.yourplatform.com"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Port"
                required
                defaultValue="22"
                type="number"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Username"
                required
                defaultValue="ftpuser"
            />
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Authentication</InputLabel>
                <Select defaultValue="SSH Key">
                    <MenuItem value="SSH Key">SSH Key</MenuItem>
                    <MenuItem value="Password">Password</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    </Grid>
);

const FTPSSettings = () => (
    <Grid container spacing={3}>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Host"
                required
                defaultValue="ftps.yourplatform.com"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Port"
                required
                defaultValue="21"
                type="number"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Username"
                required
                defaultValue="ftpuser"
            />
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Encryption</InputLabel>
                <Select defaultValue="Implicit">
                    <MenuItem value="Implicit">Implicit</MenuItem>
                    <MenuItem value="Explicit">Explicit</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    </Grid>
);

const AmazonS3Settings = () => (
    <Grid container spacing={3}>
        <Grid item xs={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Region</InputLabel>
                <Select defaultValue="us-east-1">
                    <MenuItem value="us-east-1">us-east-1</MenuItem>
                    <MenuItem value="us-west-1">us-west-1</MenuItem>
                    <MenuItem value="eu-west-1">eu-west-1</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Bucket Name"
                required
                defaultValue="shareholder-data"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                label="Folder Path"
                defaultValue="incoming/data/"
            />
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Authentication Method</InputLabel>
                <Select defaultValue="IAM Role">
                    <MenuItem value="IAM Role">IAM Role</MenuItem>
                    <MenuItem value="Access Key">Access Key</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="ARN"
                defaultValue="arn:aws:iam::123456789012:role/S3Access"
            />
        </Grid>
    </Grid>
);

const Connection = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Configure Connection Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure connection details for secure file transfers
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="SFTP" />
                <Tab label="FTPS" />
                <Tab label="Amazon S3" />
            </Tabs>
            {selectedTab === 0 && <SFTPSettings />}
            {selectedTab === 1 && <FTPSSettings />}
            {selectedTab === 2 && <AmazonS3Settings />}
        </Box>
    );
};

const Schedule = () => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Configure Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set up the schedule for file transfers
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Frequency</InputLabel>
                    <Select defaultValue="Daily">
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TimePicker
                    label="Time"
                    required
                    onChangeValue={(value) => console.log('Selected time:', value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Post-Processing: Archive file after transfer"
                />
            </Grid>
        </Grid>
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
                File Settings
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Name: Daily Shareholder File Upload
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Format: CSV with header row
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Connection Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Type: SFTP
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Host: sftp.yourplatform.com
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #E5E7EB', borderRadius: 1, bgcolor: '#F9FAFB' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Schedule
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Frequency: Daily at 02:00 AM UTC
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Post-Processing: Archive file after transfer
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
    </Box>
);

const FileUploadIntegration = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <FileSettings />;
            case 1:
                return <Connection />;
            case 2:
                return <Schedule />;
            case 3:
                return <Review />;
            default:
                return <FileSettings />;
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
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}>Previous</Button>
                        <Button variant="contained" color="primary" onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}>Next</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default FileUploadIntegration; 