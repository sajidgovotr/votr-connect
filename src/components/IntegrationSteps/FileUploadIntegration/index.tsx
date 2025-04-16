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
    Switch,
    FormControlLabel,
} from '@mui/material';

interface FileUploadIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean) => void;
}

const steps = [
    {
        label: 'Basic Info',
        description: 'Configure basic settings for your file upload integration',
    },
    {
        label: 'File Configuration',
        description: 'Define file types and validation rules',
    },
    {
        label: 'Transfer Settings',
        description: 'Configure file transfer settings and schedules',
    },
    {
        label: 'Review',
        description: 'Review your configuration before proceeding',
    },
];

const FileUploadIntegrationSteps = ({ selectedProduct, onStepComplete }: FileUploadIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        integrationName: '',
        environment: 'dev',
        protocol: 'sftp',
        host: '',
        port: '',
        username: '',
        password: '',
        fileTypes: 'csv,xlsx',
        maxFileSize: '10',
        validateContent: true,
        schedule: 'daily',
        retentionDays: '30',
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

    const handleSwitchChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [field]: event.target.checked,
        });
    };

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return !!formData.integrationName && !!formData.environment;
            case 1:
                return !!formData.fileTypes && !!formData.maxFileSize;
            case 2:
                return (
                    !!formData.protocol &&
                    !!formData.host &&
                    !!formData.port &&
                    !!formData.username &&
                    !!formData.password
                );
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
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Allowed File Types (comma-separated)"
                                required
                                value={formData.fileTypes}
                                onChange={handleInputChange('fileTypes')}
                                placeholder="csv,xlsx,txt"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Max File Size (MB)"
                                required
                                type="number"
                                value={formData.maxFileSize}
                                onChange={handleInputChange('maxFileSize')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.validateContent}
                                        onChange={handleSwitchChange('validateContent')}
                                    />
                                }
                                label="Validate File Content"
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Transfer Protocol"
                                value={formData.protocol}
                                onChange={handleInputChange('protocol')}
                                required
                            >
                                <MenuItem value="sftp">SFTP</MenuItem>
                                <MenuItem value="ftp">FTP</MenuItem>
                                <MenuItem value="s3">Amazon S3</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Host"
                                required
                                value={formData.host}
                                onChange={handleInputChange('host')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Port"
                                required
                                value={formData.port}
                                onChange={handleInputChange('port')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                required
                                value={formData.username}
                                onChange={handleInputChange('username')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange('password')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Schedule"
                                value={formData.schedule}
                                onChange={handleInputChange('schedule')}
                            >
                                <MenuItem value="hourly">Hourly</MenuItem>
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Retention Period (days)"
                                type="number"
                                value={formData.retentionDays}
                                onChange={handleInputChange('retentionDays')}
                            />
                        </Grid>
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
                            File Types: {formData.fileTypes}
                        </Typography>
                        <Typography variant="body2">
                            Max File Size: {formData.maxFileSize} MB
                        </Typography>
                        <Typography variant="body2">
                            Protocol: {formData.protocol.toUpperCase()}
                        </Typography>
                        <Typography variant="body2">
                            Host: {formData.host}
                        </Typography>
                        <Typography variant="body2">
                            Schedule: {formData.schedule}
                        </Typography>
                        <Typography variant="body2">
                            Retention Period: {formData.retentionDays} days
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
                Configure File Upload Integration for {selectedProduct}
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

export default FileUploadIntegrationSteps; 