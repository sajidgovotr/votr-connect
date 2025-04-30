import { useState, useEffect } from 'react';
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
    Card,
    InputAdornment,
} from '@mui/material';
import TimePicker from '@/components/TimePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InfoIcon from '@mui/icons-material/Info';
import CloudIcon from '@mui/icons-material/Cloud';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LanguageIcon from '@mui/icons-material/Language';

interface FileUploadIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean, data?: any, formValues?: any) => void;
    initialValues?: any;
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

const FileUploadIntegrationSteps = ({
    selectedProduct,
    selectedEnvironment,
    onStepComplete,
    initialValues
}: FileUploadIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);

    const {
        control,
        watch,
        formState: { errors, isSubmitting },
        trigger,
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: initialValues || {
            environment: selectedEnvironment,
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

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
            if (initialValues.isEditingFromReview && initialValues.activeSection !== undefined) {
                // Map the section index to the correct step
                // 0: Basic Info, 1: File Configuration, 2: Transfer Settings
                setActiveStep(initialValues.activeSection);
            }
        }
    }, [initialValues, reset]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            const currentStepFields = getStepFields(activeStep);
            const isValid = await trigger(currentStepFields);

            if (isValid) {
                const data = watch();
                const reviewData = [
                    {
                        section: 'Basic Info',
                        fields: [
                            { name: 'Integration Name', value: data.integrationName },
                            { name: 'Environment', value: data.environment },
                            { name: 'Time Zone', value: data.timeZone },
                        ]
                    },
                    {
                        section: 'File Configuration',
                        fields: [
                            { name: 'File Format', value: data.fileFormat?.toUpperCase() },
                            { name: 'File Name Pattern', value: data.fileNamePattern },
                            { name: 'Max File Size', value: `${data.maxFileSize} MB` },
                            { name: 'Has Header', value: data.hasHeader ? 'Yes' : 'No' },
                        ]
                    },
                    {
                        section: 'Transfer Settings',
                        fields: [
                            { name: 'Protocol', value: data.protocol?.toUpperCase() },
                            ...(data.protocol === 'ftp' ? [
                                { name: 'Type', value: data.ftpType?.toUpperCase() },
                                { name: 'Host', value: data.host },
                                { name: 'Port', value: data.port },
                                { name: 'Username', value: data.username },
                                { name: data.ftpType === 'ftp' ? 'Password' : 'SSH Key', value: '********' },
                                ...(data.ftpType === 'sftp' ? [
                                    { name: 'Passphrase', value: data.passphrase ? 'Set' : 'Not Set' }
                                ] : [])
                            ] : [
                                { name: 'Region', value: data.region },
                                { name: 'Bucket Name', value: data.bucketName },
                                { name: 'Folder Path', value: data.folderPath || 'Root' },
                                { name: 'ARN', value: data.arn },
                                { name: 'Access Key', value: data.accessKey },
                                { name: 'Secret Key', value: '********' }
                            ]),
                            { name: 'Schedule', value: data.schedule },
                            { name: 'Time of Day', value: data.timeOfDay },
                        ]
                    }
                ];

                onStepComplete(true, reviewData, data);
            }
        } else {
            const currentStepFields = getStepFields(activeStep);
            const isValid = await trigger(currentStepFields);

            if (isValid) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
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

    const isStepValid = (step: number) => {
        const stepFields = getStepFields(step);
        return stepFields.every(field => !errors[field]);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <InfoIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Basic Information</Typography>
                        </Box>
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CloudIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CloudIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LanguageIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                    </Card>
                );

            case 1:
                return (
                    <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <StorageIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">File Configuration</Typography>
                        </Box>
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <StorageIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FolderIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <StorageIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                                    color="primary"
                                                />
                                            }
                                            label="File Contains Header Row"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                );

            case 2:
                return (
                    <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <CloudUploadIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Transfer Settings</Typography>
                        </Box>
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CloudUploadIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SecurityIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CloudIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CloudIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <VpnKeyIcon color="action" />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
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
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <VpnKeyIcon color="action" />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
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
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <VpnKeyIcon color="action" />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
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
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <VpnKeyIcon color="action" />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
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
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <VpnKeyIcon color="action" />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CloudIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <StorageIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <FolderIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SecurityIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <VpnKeyIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <VpnKeyIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ScheduleIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
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
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Configure File Upload Integration for {selectedProduct}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ '& .MuiStepLabel-root': { py: 1 } }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {step.label}
                            </Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography color="text.secondary" sx={{ mb: 3 }}>
                                {step.description}
                            </Typography>
                            {renderStepContent(index)}
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ minWidth: 120 }}
                                    disabled={!isStepValid(index) || isSubmitting}
                                >
                                    Save & Continue
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ minWidth: 120 }}
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