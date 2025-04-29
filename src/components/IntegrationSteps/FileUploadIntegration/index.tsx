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
import TimePicker from '@/components/TimePicker';
import { useFileUploadIntegrationMutation } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';

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
    const [fileUploadIntegration, { isLoading }] = useFileUploadIntegrationMutation();
    const { showSnackbar } = useMessage()
    const [formData, setFormData] = useState({
        integrationName: '',
        environment: 'dev',
        protocol: 'ftp',
        host: '',
        port: '',
        username: '',
        password: '',
        fileTypes: 'csv,xlsx',
        maxFileSize: '10',
        validateContent: true,
        schedule: 'daily',
        timeOfDay: '',
        fileName: '',
        fileFormat: 'xlsx',
        fileNamePattern: '',
        hasHeader: true,
        timeZone: 'UTC',
        // FTP/SFTP specific fields
        ftpType: 'ftp',
        sshKey: '',
        passphrase: '',
        // S3 specific fields
        region: '',
        bucketName: '',
        folderPath: '',
        arn: '',
        accessKey: '',
        secretKey: '',
    });


    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            return await handleSubmit()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleInputChange = (field: keyof typeof formData, value?: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [field]: value || event.target.value,
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

    const handleSubmit = async () => {
        let payload;

        if (formData.protocol === 'ftp') {
            if (formData.ftpType === 'ftp') {
                payload = {
                    name: formData.integrationName,
                    fileFormat: formData.fileFormat.toUpperCase(),
                    fileNamePattern: formData.fileNamePattern,
                    isHeaderRowIncluded: formData.hasHeader,
                    transferFrequency: formData.schedule,
                    timeOfDay: formData.timeOfDay,
                    timeZone: formData.timeZone,
                    afterSuccessfulTransferAction: "archive",
                    afterFailedTransferAction: "retry",
                    url: formData.host,
                    ftp: {
                        host: formData.host,
                        port: parseInt(formData.port),
                        type: formData.ftpType,
                        ftpAuthentication: {
                            type: "password",
                            username: formData.username,
                            password: formData.password
                        }
                    }
                };
            } else if (formData.ftpType === 'sftp') {
                payload = {
                    name: formData.integrationName,
                    fileFormat: formData.fileFormat.toUpperCase(),
                    fileNamePattern: formData.fileNamePattern,
                    isHeaderRowIncluded: formData.hasHeader,
                    transferFrequency: formData.schedule,
                    timeOfDay: formData.timeOfDay,
                    timeZone: formData.timeZone,
                    afterSuccessfulTransferAction: "archive",
                    afterFailedTransferAction: "retry",
                    url: formData.host,
                    ftp: {
                        host: formData.host,
                        port: parseInt(formData.port),
                        type: formData.ftpType,
                        ftpAuthentication: {
                            type: "sshKey",
                            username: formData.username,
                            sshKey: formData.sshKey,
                            passphrase: formData.passphrase
                        }
                    }
                };
            }
        } else if (formData.protocol === 's3') {
            payload = {
                name: formData.integrationName,
                fileFormat: formData.fileFormat.toUpperCase(),
                fileNamePattern: formData.fileNamePattern,
                isHeaderRowIncluded: formData.hasHeader,
                transferFrequency: formData.schedule,
                timeOfDay: formData.timeOfDay,
                timeZone: formData.timeZone,
                afterSuccessfulTransferAction: "archive",
                afterFailedTransferAction: "retry",
                url: `s3://${formData.bucketName}.s3.${formData.region}.amazonaws.com${formData.folderPath}`,
                amazonS3Details: {
                    region: formData.region,
                    bucketName: formData.bucketName,
                    folderPath: formData.folderPath,
                    amazonS3Authentication: {
                        authenticationMethod: "accessKey",
                        ARN: formData.arn,
                        accessKey: formData.accessKey,
                        secretKey: formData.secretKey
                    }
                }
            };
        }

        const response = await fileUploadIntegration(payload);
        if (response.error) {
            showSnackbar('Failed to create integration', '', 'error')
        } else {
            showSnackbar('Integration created successfully', '', 'success')
            onStepComplete(true);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return !!formData.integrationName && !!formData.environment;
            case 1:
                return !!formData.fileTypes && !!formData.maxFileSize;
            case 2:
                if (formData.protocol === 'ftp') {
                    return (
                        !!formData.protocol &&
                        !!formData.host &&
                        !!formData.port &&
                        !!formData.username &&
                        (formData.ftpType === 'ftp' ? !!formData.password : !!formData.sshKey)
                    );
                } else if (formData.protocol === 's3') {
                    return (
                        !!formData.protocol &&
                        !!formData.region &&
                        !!formData.bucketName &&
                        !!formData.arn &&
                        !!formData.accessKey &&
                        !!formData.secretKey
                    );
                }
                return false;
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
                                label="Time Zone"
                                value={formData.timeZone}
                                onChange={handleInputChange('timeZone')}
                                required
                            >
                                <MenuItem value="UTC">UTC</MenuItem>
                                <MenuItem value="America/New_York">America/New_York</MenuItem>
                                <MenuItem value="Europe/London">Europe/London</MenuItem>
                                <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
                                <MenuItem value="Australia/Sydney">Australia/Sydney</MenuItem>
                                <MenuItem value="Asia/Dubai">Asia/Dubai</MenuItem>
                                <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
                                <MenuItem value="Europe/Paris">Europe/Paris</MenuItem>
                                <MenuItem value="America/Los_Angeles">America/Los_Angeles</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="File Name"
                                required
                                value={formData.fileName}
                                onChange={handleInputChange('fileName')}
                            />
                        </Grid> */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="File Format"
                                required
                                value={formData.fileFormat}
                                onChange={handleInputChange('fileFormat')}
                            >
                                <MenuItem value="xlsx">XLSX</MenuItem>
                                <MenuItem value="csv">CSV</MenuItem>
                                <MenuItem value="txt">TXT</MenuItem>
                                <MenuItem value="json">JSON</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="File Name Pattern"
                                required
                                value={formData.fileNamePattern}
                                onChange={handleInputChange('fileNamePattern')}
                                helperText="e.g., data_*.xlsx, report_*.csv"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Allowed File Types (comma-separated)"
                                required
                                value={formData.fileTypes}
                                onChange={handleInputChange('fileTypes')}
                                placeholder="csv,xlsx,txt"
                            />
                        </Grid> */}
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
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.hasHeader}
                                        onChange={handleSwitchChange('hasHeader')}
                                    />
                                }
                                label="File Contains Header Row"
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
                                <MenuItem value="ftp">FTP/SFTP</MenuItem>
                                <MenuItem value="s3">Amazon S3</MenuItem>
                            </TextField>
                        </Grid>

                        {formData.protocol === 'ftp' && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Type"
                                        value={formData.ftpType}
                                        onChange={handleInputChange('ftpType')}
                                        required
                                    >
                                        <MenuItem value="ftp">FTP</MenuItem>
                                        <MenuItem value="sftp">SFTP</MenuItem>
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
                                        type="number"
                                        value={formData.port}
                                        onChange={handleInputChange('port')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                        Authentication
                                    </Typography>
                                </Grid>
                                {formData.ftpType === 'ftp' ? (
                                    <>
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
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Username"
                                                required
                                                value={formData.username}
                                                onChange={handleInputChange('username')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="SSH Key"
                                                required
                                                multiline
                                                rows={4}
                                                value={formData.sshKey}
                                                onChange={handleInputChange('sshKey')}
                                                helperText="Paste your SSH private key here"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Passphrase (Optional)"
                                                type="password"
                                                value={formData.passphrase}
                                                onChange={handleInputChange('passphrase')}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </>
                        )}

                        {formData.protocol === 's3' && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Region"
                                        required
                                        value={formData.region}
                                        onChange={handleInputChange('region')}
                                        helperText="e.g., us-east-1"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Bucket Name"
                                        required
                                        value={formData.bucketName}
                                        onChange={handleInputChange('bucketName')}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Folder Path"
                                        value={formData.folderPath}
                                        onChange={handleInputChange('folderPath')}
                                        helperText="Optional path within the bucket"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                        Authentication
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ARN"
                                        required
                                        value={formData.arn}
                                        onChange={handleInputChange('arn')}
                                        helperText="Amazon Resource Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Access Key"
                                        required
                                        value={formData.accessKey}
                                        onChange={handleInputChange('accessKey')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Secret Key"
                                        required
                                        type="password"
                                        value={formData.secretKey}
                                        onChange={handleInputChange('secretKey')}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Schedule"
                                value={formData.schedule}
                                onChange={handleInputChange('schedule')}
                            >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TimePicker
                                label="Time of Day"
                                value={formData.timeOfDay}
                                onChangeValue={(value) => handleInputChange('timeOfDay', value)}
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
                            File Name: {formData.fileName}
                        </Typography>
                        <Typography variant="body2">
                            File Format: {formData.fileFormat.toUpperCase()}
                        </Typography>
                        <Typography variant="body2">
                            File Name Pattern: {formData.fileNamePattern}
                        </Typography>
                        <Typography variant="body2">
                            Has Header: {formData.hasHeader ? 'Yes' : 'No'}
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
                        {formData.protocol === 'ftp' && (
                            <>
                                <Typography variant="body2">
                                    Type: {formData.ftpType.toUpperCase()}
                                </Typography>
                                <Typography variant="body2">
                                    Host: {formData.host}
                                </Typography>
                                <Typography variant="body2">
                                    Port: {formData.port}
                                </Typography>
                                {formData.ftpType === 'ftp' ? (
                                    <>
                                        <Typography variant="body2">
                                            Username: {formData.username}
                                        </Typography>
                                        <Typography variant="body2">
                                            Password: ********
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2">
                                            SSH Key: ********
                                        </Typography>
                                        <Typography variant="body2">
                                            Passphrase: {formData.passphrase ? 'Set' : 'Not Set'}
                                        </Typography>
                                    </>
                                )}
                            </>
                        )}
                        {formData.protocol === 's3' && (
                            <>
                                <Typography variant="body2">
                                    Region: {formData.region}
                                </Typography>
                                <Typography variant="body2">
                                    Bucket Name: {formData.bucketName}
                                </Typography>
                                <Typography variant="body2">
                                    Folder Path: {formData.folderPath || 'Root'}
                                </Typography>
                                <Typography variant="body2">
                                    ARN: {formData.arn}
                                </Typography>
                                <Typography variant="body2">
                                    Access Key: {formData.accessKey}
                                </Typography>
                                <Typography variant="body2">
                                    Secret Key: ********
                                </Typography>
                            </>
                        )}
                        <Typography variant="body2">
                            Schedule: {formData.schedule}
                        </Typography>
                        <Typography variant="body2">
                            Time of Day: {formData.timeOfDay}
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