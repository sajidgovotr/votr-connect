import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
    IconButton,
    Card,
    Divider,
    Paper,
    InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HttpIcon from '@mui/icons-material/Http';
import SecurityIcon from '@mui/icons-material/Security';
import SchemaIcon from '@mui/icons-material/Schema';
import InfoIcon from '@mui/icons-material/Info';
import CloudIcon from '@mui/icons-material/Cloud';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface RestApiIntegrationStepsProps {
    selectedProduct: string;
    selectedEnvironment: string;
    onStepComplete: (completed: boolean, reviewData?: Array<{ section: string; fields: Array<{ name: string; value: string }> }>, formValues?: any) => void;
    initialValues?: {
        integrationName: string;
        baseURL: string;
        method: string;
        environment: string;
        dataFormat: string;
        authMethod: string;
        apiKey: string;
        dataSchema: {
            schemaName: string;
            endpoint: string;
            fields: Array<{
                name: string;
                type: string;
                required: boolean;
            }>;
        };
        activeSection?: number;
        isEditingFromReview?: boolean;
    };
}

const steps = [
    {
        label: 'Basic Info',
        description: 'Configure basic settings for your REST API integration',
    },
    {
        label: 'Authentication',
        description: 'Set up authentication for your REST API integration',
    },
    {
        label: 'Data Schema',
        description: 'Define the data structure for your integration',
    },
];

interface FormValues {
    integrationName: string;
    baseURL: string;
    method: string;
    environment: string;
    dataFormat: string;
    authMethod: string;
    apiKey: string;
    dataSchema: {
        schemaName: string;
        endpoint: string;
        fields: Array<{
            name: string;
            type: string;
            required: boolean;
        }>;
    };
}

const schema = yup.object().shape({
    integrationName: yup.string().required('Integration name is required'),
    baseURL: yup.string().required('Base URL is required').url('Must be a valid URL'),
    method: yup.string().required('Method is required'),
    environment: yup.string().required('Environment is required'),
    dataFormat: yup.string().required('Data format is required'),
    authMethod: yup.string().required('Authentication method is required'),
    apiKey: yup.string().required('API Key is required'),
    dataSchema: yup.object().shape({
        schemaName: yup.string().required('Schema name is required'),
        endpoint: yup.string().required('Endpoint is required'),
        fields: yup.array().of(
            yup.object().shape({
                name: yup.string().required('Field name is required'),
                type: yup.string().required('Field type is required'),
                required: yup.boolean().required('Required field selection is required'),
            })
        ).min(1, 'At least one field is required').required('Fields are required'),
    }).required('Data schema is required'),
});

const RestApiIntegrationSteps = ({ selectedProduct, onStepComplete, initialValues }: RestApiIntegrationStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);

    const {
        control,
        formState: { errors },
        watch,
        setValue,
        trigger,
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: initialValues || {
            integrationName: '',
            baseURL: '',
            method: 'GET',
            environment: 'dev',
            dataFormat: 'json',
            authMethod: 'apikey',
            apiKey: '',
            dataSchema: {
                schemaName: '',
                endpoint: '',
                fields: [],
            },
        },
    });

    // Reset form when initialValues change
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
            if (initialValues.isEditingFromReview && initialValues.activeSection !== undefined) {
                // Map the section index to the correct step
                // 0: Basic Info, 1: Authentication, 2: Data Schema
                setActiveStep(initialValues.activeSection);
            }
        }
    }, [initialValues, reset]);

    const getStepFields = (step: number): (keyof FormValues)[] => {
        switch (step) {
            case 0:
                return ['integrationName', 'baseURL', 'method', 'environment', 'dataFormat'];
            case 1:
                return ['authMethod', 'apiKey'];
            case 2:
                return ['dataSchema'];
            default:
                return [];
        }
    };

    const isStepValid = (step: number) => {
        const stepFields = getStepFields(step);
        return stepFields.every(field => {
            if (field === 'dataSchema') {
                const dataSchema = watch('dataSchema');
                return dataSchema.schemaName && dataSchema.endpoint && dataSchema.fields.length > 0;
            }
            return !errors[field];
        });
    };

    const handleBack = () => {
        // If editing from review, go back to review step
        if (initialValues?.isEditingFromReview) {
            onStepComplete(true, undefined, {
                ...initialValues,
                isEditingFromReview: false
            });
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = async () => {
        // Validate current step before proceeding
        const currentStepFields = getStepFields(activeStep);
        const isValid = await trigger(currentStepFields);

        if (!isValid) {
            return;
        }

        if (activeStep === steps.length - 1) {
            const reviewData = [
                {
                    section: 'Basic Info',
                    fields: [
                        { name: 'Integration Name', value: watch('integrationName') },
                        { name: 'Base URL', value: watch('baseURL') },
                        { name: 'Method', value: watch('method') },
                        { name: 'Environment', value: watch('environment') },
                        { name: 'Data Format', value: watch('dataFormat') },
                    ]
                },
                {
                    section: 'Authentication',
                    fields: [
                        { name: 'Authentication Method', value: watch('authMethod') },
                        { name: 'API Key', value: watch('apiKey') },
                    ]
                },
                {
                    section: 'Data Schema',
                    fields: [
                        { name: 'Schema Name', value: watch('dataSchema.schemaName') },
                        { name: 'Endpoint', value: watch('dataSchema.endpoint') },
                        ...(watch('dataSchema.fields')?.map((field, index) => ({
                            name: `Field ${index + 1}`,
                            value: `${field.name} (${field.type}, ${field.required ? 'Required' : 'Optional'})`
                        })) || [])
                    ]
                }
            ];
            const formValues = {
                integrationName: watch('integrationName'),
                baseURL: watch('baseURL'),
                method: watch('method'),
                environment: watch('environment'),
                dataFormat: watch('dataFormat'),
                authMethod: watch('authMethod'),
                apiKey: watch('apiKey'),
                dataSchema: {
                    schemaName: watch('dataSchema.schemaName'),
                    endpoint: watch('dataSchema.endpoint'),
                    fields: watch('dataSchema.fields'),
                }
            };
            onStepComplete(true, reviewData, formValues);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleRemoveField = (index: number) => {
        const currentFields = watch('dataSchema.fields');
        const newFields = currentFields.filter((_, i) => i !== index);
        setValue('dataSchema.fields', newFields, { shouldValidate: true });
        trigger('dataSchema');
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
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Integration Name"
                                            error={!!error}
                                            helperText={error?.message}
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
                                    name="baseURL"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Base URL"
                                            error={!!error}
                                            helperText={error?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HttpIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="method"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Method"
                                            error={!!error}
                                            helperText={error?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HttpIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            <MenuItem value="GET">GET</MenuItem>
                                            <MenuItem value="POST">POST</MenuItem>
                                            <MenuItem value="PUT">PUT</MenuItem>
                                            <MenuItem value="DELETE">DELETE</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="environment"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Environment"
                                            error={!!error}
                                            helperText={error?.message}
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
                                    name="dataFormat"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Data Format"
                                            error={!!error}
                                            helperText={error?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FormatListBulletedIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            <MenuItem value="json">JSON</MenuItem>
                                            <MenuItem value="xml">XML</MenuItem>
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
                            <SecurityIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Authentication Settings</Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name="authMethod"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Authentication Method"
                                            error={!!error}
                                            helperText={error?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SecurityIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            <MenuItem value="apikey">API Key</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            {watch('authMethod') === 'apikey' && (
                                <Grid item xs={12}>
                                    <Controller
                                        name="apiKey"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="API Key"
                                                error={!!error}
                                                helperText={error?.message}
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
                            )}
                        </Grid>
                    </Card>
                );

            case 2:
                return (
                    <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <SchemaIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Data Schema Configuration</Typography>
                        </Box>
                        <Box>
                            <Controller
                                name="dataSchema.schemaName"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Schema Name"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 3 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SchemaIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="dataSchema.endpoint"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Endpoint"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 3 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HttpIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>Fields</Typography>
                            <Box>
                                {watch('dataSchema.fields')?.map((_field, index) => (
                                    <Paper
                                        key={index}
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            mb: 2,
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Controller
                                            name={`dataSchema.fields.${index}.name`}
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Field Name"
                                                    error={!!error}
                                                    helperText={error?.message}
                                                    required
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`dataSchema.fields.${index}.type`}
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    select
                                                    label="Type"
                                                    error={!!error}
                                                    helperText={error?.message}
                                                    required
                                                >
                                                    <MenuItem value="string">String</MenuItem>
                                                    <MenuItem value="number">Number</MenuItem>
                                                    <MenuItem value="boolean">Boolean</MenuItem>
                                                </TextField>
                                            )}
                                        />
                                        <Controller
                                            name={`dataSchema.fields.${index}.required`}
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    select
                                                    label="Required"
                                                    error={!!error}
                                                    helperText={error?.message}
                                                    required
                                                >
                                                    <MenuItem value="true">Yes</MenuItem>
                                                    <MenuItem value="false">No</MenuItem>
                                                </TextField>
                                            )}
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveField(index)}
                                            color="error"
                                            sx={{ ml: 1 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>
                                ))}
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        const currentFields = watch('dataSchema.fields') || [];
                                        setValue('dataSchema.fields', [
                                            ...currentFields,
                                            { name: '', type: 'string', required: false }
                                        ], { shouldValidate: true });
                                    }}
                                    sx={{ mt: 2 }}
                                >
                                    Add Field
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Configure REST API Integration for {selectedProduct}
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
                                    disabled={!isStepValid(index)}
                                    sx={{ minWidth: 120 }}
                                >
                                    {'Save & Continue'}
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

export default RestApiIntegrationSteps;