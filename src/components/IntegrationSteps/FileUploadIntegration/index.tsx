import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const schema = yup.object().shape({
    integrationName: yup.string().required('Integration name is required'),
    environment: yup.string().required('Environment is required'),
    timeZone: yup.string().required('Time zone is required'),
    fileFormat: yup.string().required('File format is required'),
    fileNamePattern: yup.string().required('File name pattern is required'),
    maxFileSize: yup.string().required('Max file size is required'),
    hasHeader: yup.boolean(),
    protocol: yup.string().required('Protocol is required'),
    schedule: yup.string().required('Schedule is required'),
    timeOfDay: yup.string().required('Time of day is required'),
    // FTP/SFTP specific fields
    ftpType: yup.string().when('protocol', {
        is: 'ftp',
        then: (schema) => schema.required('FTP type is required'),
    }),
    host: yup.string().when('protocol', {
        is: 'ftp',
        then: (schema) => schema.required('Host is required'),
    }),
    port: yup.string().when('protocol', {
        is: 'ftp',
        then: (schema) => schema.required('Port is required'),
    }),
    username: yup.string().when('protocol', {
        is: 'ftp',
        then: (schema) => schema.required('Username is required'),
    }),
    password: yup.string().when(['protocol', 'ftpType'], {
        is: (protocol: string, ftpType: string) => protocol === 'ftp' && ftpType === 'ftp',
        then: (schema) => schema.required('Password is required'),
    }),
    sshKey: yup.string().when(['protocol', 'ftpType'], {
        is: (protocol: string, ftpType: string) => protocol === 'ftp' && ftpType === 'sftp',
        then: (schema) => schema.required('SSH key is required'),
    }),
    passphrase: yup.string(),
    // S3 specific fields
    region: yup.string().when('protocol', {
        is: 's3',
        then: (schema) => schema.required('Region is required'),
    }),
    bucketName: yup.string().when('protocol', {
        is: 's3',
        then: (schema) => schema.required('Bucket name is required'),
    }),
    folderPath: yup.string(),
    arn: yup.string().when('protocol', {
        is: 's3',
        then: (schema) => schema.required('ARN is required'),
    }),
    accessKey: yup.string().when('protocol', {
        is: 's3',
        then: (schema) => schema.required('Access key is required'),
    }),
    secretKey: yup.string().when('protocol', {
        is: 's3',
        then: (schema) => schema.required('Secret key is required'),
    }),
});

type FormData = yup.InferType<typeof schema>;

const FileUploadIntegrationSteps = ({ selectedProduct, onStepComplete }: FileUploadIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [fileUploadIntegration] = useFileUploadIntegrationMutation();
    const { showSnackbar } = useMessage();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        trigger,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            environment: 'dev',
            protocol: 'ftp',
            ftpType: 'ftp',
            fileFormat: 'xlsx',
            hasHeader: true,
            timeZone: 'UTC',
            schedule: 'daily',
            timeOfDay: '',
        },
        mode: 'onChange',
    });

    const protocol = watch('protocol');
    const ftpType = watch('ftpType');

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            return await handleSubmit(onSubmit)();
        }

        // Validate current step before proceeding
        const currentStepFields = getStepFields(activeStep);
        const isValid = await trigger(currentStepFields);

        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const getStepFields = (step: number): (keyof FormData)[] => {
        switch (step) {
            case 0:
                return ['integrationName', 'environment', 'timeZone'];
            case 1:
                return ['fileFormat', 'fileNamePattern', 'maxFileSize'];
            case 2:
                if (protocol === 'ftp') {
                    return ['protocol', 'ftpType', 'host', 'port', 'username',
                        ftpType === 'ftp' ? 'password' : 'sshKey', 'schedule', 'timeOfDay'];
                } else {
                    return ['protocol', 'region', 'bucketName', 'arn', 'accessKey', 'secretKey', 'schedule', 'timeOfDay'];
                }
            default:
                return [];
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = async (data: FormData) => {
        try {
            let payload;

            if (data.protocol === 'ftp') {
                if (data.ftpType === 'ftp') {
                    payload = {
                        name: data.integrationName,
                        fileFormat: data.fileFormat.toUpperCase(),
                        fileNamePattern: data.fileNamePattern,
                        isHeaderRowIncluded: data.hasHeader,
                        transferFrequency: data.schedule,
                        timeOfDay: data.timeOfDay || '',
                        timeZone: data.timeZone,
                        afterSuccessfulTransferAction: "archive",
                        afterFailedTransferAction: "retry",
                        url: data.host,
                        ftp: {
                            host: data.host,
                            port: parseInt(data.port || ''),
                            type: data.ftpType,
                            ftpAuthentication: {
                                type: "password",
                                username: data.username,
                                password: data.password
                            }
                        }
                    };
                } else {
                    payload = {
                        name: data.integrationName,
                        fileFormat: data.fileFormat.toUpperCase(),
                        fileNamePattern: data.fileNamePattern,
                        isHeaderRowIncluded: data.hasHeader,
                        transferFrequency: data.schedule,
                        timeOfDay: data.timeOfDay || '',
                        timeZone: data.timeZone,
                        afterSuccessfulTransferAction: "archive",
                        afterFailedTransferAction: "retry",
                        url: data.host,
                        ftp: {
                            host: data.host,
                            port: parseInt(data.port || ''),
                            type: data.ftpType,
                            ftpAuthentication: {
                                type: "sshKey",
                                username: data.username,
                                sshKey: data.sshKey,
                                passphrase: data.passphrase
                            }
                        }
                    };
                }
            } else {
                payload = {
                    name: data.integrationName,
                    fileFormat: data.fileFormat.toUpperCase(),
                    fileNamePattern: data.fileNamePattern,
                    isHeaderRowIncluded: data.hasHeader,
                    transferFrequency: data.schedule,
                    timeOfDay: data.timeOfDay || '',
                    timeZone: data.timeZone,
                    afterSuccessfulTransferAction: "archive",
                    afterFailedTransferAction: "retry",
                    url: `s3://${data.bucketName}.s3.${data.region}.amazonaws.com${data.folderPath || ''}`,
                    amazonS3Details: {
                        region: data.region,
                        bucketName: data.bucketName,
                        folderPath: data.folderPath || '',
                        amazonS3Authentication: {
                            authenticationMethod: "accessKey",
                            ARN: data.arn,
                            accessKey: data.accessKey,
                            secretKey: data.secretKey
                        }
                    }
                };
            }

            const response = await fileUploadIntegration(payload);
            if (response.error) {
                showSnackbar('Failed to create integration', '', 'error');
            } else {
                showSnackbar('Integration created successfully', '', 'success');
                onStepComplete(true);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } catch (error) {
            showSnackbar('An error occurred while creating the integration', '', 'error');
        }
    };

    const isStepValid = (step: number) => {
        const stepFields = getStepFields(step);
        return stepFields.every(field => !errors[field]);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Controller
                                name="integrationName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Integration Name"
                                        error={!!errors.integrationName}
                                        helperText={errors.integrationName?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="environment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Environment"
                                        error={!!errors.environment}
                                        helperText={errors.environment?.message}
                                    >
                                        <MenuItem value="dev">Development</MenuItem>
                                        <MenuItem value="staging">Staging</MenuItem>
                                        <MenuItem value="prod">Production</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="timeZone"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Time Zone"
                                        error={!!errors.timeZone}
                                        helperText={errors.timeZone?.message}
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
                                )}
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="fileFormat"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="File Format"
                                        error={!!errors.fileFormat}
                                        helperText={errors.fileFormat?.message}
                                    >
                                        <MenuItem value="xlsx">XLSX</MenuItem>
                                        <MenuItem value="csv">CSV</MenuItem>
                                        <MenuItem value="txt">TXT</MenuItem>
                                        <MenuItem value="json">JSON</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="fileNamePattern"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="File Name Pattern"
                                        error={!!errors.fileNamePattern}
                                        helperText={errors.fileNamePattern?.message || "e.g., data_*.xlsx, report_*.csv"}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="maxFileSize"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Max File Size (MB)"
                                        type="number"
                                        error={!!errors.maxFileSize}
                                        helperText={errors.maxFileSize?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="hasHeader"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        }
                                        label="File Contains Header Row"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="protocol"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Transfer Protocol"
                                        error={!!errors.protocol}
                                        helperText={errors.protocol?.message}
                                    >
                                        <MenuItem value="ftp">FTP/SFTP</MenuItem>
                                        <MenuItem value="s3">Amazon S3</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {protocol === 'ftp' && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="ftpType"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                select
                                                label="Type"
                                                error={!!errors.ftpType}
                                                helperText={errors.ftpType?.message}
                                            >
                                                <MenuItem value="ftp">FTP</MenuItem>
                                                <MenuItem value="sftp">SFTP</MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="host"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Host"
                                                error={!!errors.host}
                                                helperText={errors.host?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="port"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Port"
                                                type="number"
                                                error={!!errors.port}
                                                helperText={errors.port?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                        Authentication
                                    </Typography>
                                </Grid>
                                {ftpType === 'ftp' ? (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Username"
                                                        error={!!errors.username}
                                                        helperText={errors.username?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Password"
                                                        type="password"
                                                        error={!!errors.password}
                                                        helperText={errors.password?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Username"
                                                        error={!!errors.username}
                                                        helperText={errors.username?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="sshKey"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="SSH Key"
                                                        multiline
                                                        rows={4}
                                                        error={!!errors.sshKey}
                                                        helperText={errors.sshKey?.message || "Paste your SSH private key here"}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="passphrase"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Passphrase (Optional)"
                                                        type="password"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </>
                        )}

                        {protocol === 's3' && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="region"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Region"
                                                error={!!errors.region}
                                                helperText={errors.region?.message || "e.g., us-east-1"}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="bucketName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Bucket Name"
                                                error={!!errors.bucketName}
                                                helperText={errors.bucketName?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="folderPath"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Folder Path"
                                                helperText="Optional path within the bucket"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                        Authentication
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="arn"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="ARN"
                                                error={!!errors.arn}
                                                helperText={errors.arn?.message || "Amazon Resource Name"}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="accessKey"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Access Key"
                                                error={!!errors.accessKey}
                                                helperText={errors.accessKey?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="secretKey"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Secret Key"
                                                type="password"
                                                error={!!errors.secretKey}
                                                helperText={errors.secretKey?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="schedule"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Schedule"
                                        error={!!errors.schedule}
                                        helperText={errors.schedule?.message}
                                    >
                                        <MenuItem value="daily">Daily</MenuItem>
                                        <MenuItem value="weekly">Weekly</MenuItem>
                                        <MenuItem value="monthly">Monthly</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="timeOfDay"
                                control={control}
                                render={({ field }) => (
                                    <Box sx={{ position: 'relative' }}>
                                        <TimePicker
                                            required={true}
                                            label="Time of Day"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            error={!!errors.timeOfDay}
                                            helperText={errors.timeOfDay?.message}
                                        />
                                    </Box>
                                )}
                            />
                        </Grid>
                    </Grid>
                );

            case 3:
                const formValues = watch();
                return (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Configuration Summary
                        </Typography>
                        <Typography variant="body2">
                            Integration Name: {formValues.integrationName}
                        </Typography>
                        <Typography variant="body2">
                            Environment: {formValues.environment}
                        </Typography>
                        <Typography variant="body2">
                            File Format: {formValues.fileFormat?.toUpperCase()}
                        </Typography>
                        <Typography variant="body2">
                            File Name Pattern: {formValues.fileNamePattern}
                        </Typography>
                        <Typography variant="body2">
                            Has Header: {formValues.hasHeader ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="body2">
                            Max File Size: {formValues.maxFileSize} MB
                        </Typography>
                        <Typography variant="body2">
                            Protocol: {formValues.protocol?.toUpperCase()}
                        </Typography>
                        {formValues.protocol === 'ftp' && (
                            <>
                                <Typography variant="body2">
                                    Type: {formValues.ftpType?.toUpperCase()}
                                </Typography>
                                <Typography variant="body2">
                                    Host: {formValues.host}
                                </Typography>
                                <Typography variant="body2">
                                    Port: {formValues.port}
                                </Typography>
                                {formValues.ftpType === 'ftp' ? (
                                    <>
                                        <Typography variant="body2">
                                            Username: {formValues.username}
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
                                            Passphrase: {formValues.passphrase ? 'Set' : 'Not Set'}
                                        </Typography>
                                    </>
                                )}
                            </>
                        )}
                        {formValues.protocol === 's3' && (
                            <>
                                <Typography variant="body2">
                                    Region: {formValues.region}
                                </Typography>
                                <Typography variant="body2">
                                    Bucket Name: {formValues.bucketName}
                                </Typography>
                                <Typography variant="body2">
                                    Folder Path: {formValues.folderPath || 'Root'}
                                </Typography>
                                <Typography variant="body2">
                                    ARN: {formValues.arn}
                                </Typography>
                                <Typography variant="body2">
                                    Access Key: {formValues.accessKey}
                                </Typography>
                                <Typography variant="body2">
                                    Secret Key: ********
                                </Typography>
                            </>
                        )}
                        <Typography variant="body2">
                            Schedule: {formValues.schedule}
                        </Typography>
                        <Typography variant="body2">
                            Time of Day: {formValues.timeOfDay}
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
                                    disabled={!isStepValid(index) || isSubmitting}
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