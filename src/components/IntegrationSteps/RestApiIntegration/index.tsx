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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

    // const reviewData = [
    //     {
    //         section: 'Basic Info',
    //         fields: [
    //             { name: 'Integration Name', value: watch('integrationName') },
    //             { name: 'Base URL', value: watch('baseURL') },
    //             { name: 'Method', value: watch('method') },
    //             { name: 'Environment', value: watch('environment') },
    //             { name: 'Data Format', value: watch('dataFormat') },
    //         ]
    //     },
    //     {
    //         section: 'Authentication',
    //         fields: [
    //             { name: 'Authentication Method', value: watch('authMethod') },
    //             { name: 'API Key', value: watch('apiKey') },
    //         ]
    //     },
    //     {
    //         section: 'Data Schema',
    //         fields: [
    //             { name: 'Schema Name', value: watch('dataSchema.schemaName') },
    //             { name: 'Endpoint', value: watch('dataSchema.endpoint') },
    //             ...(watch('dataSchema.fields')?.map((field, index) => ({
    //                 name: `Field ${index + 1}`,
    //                 value: `${field.name} (${field.type}, ${field.required ? 'Required' : 'Optional'})`
    //             })) || [])
    //         ]
    //     }
    // ];

    // const reviewColumns = [
    //     {
    //         name: 'Section',
    //         key: 'section',
    //         align: 'left' as const,
    //     },
    //     {
    //         name: 'Field',
    //         key: 'name',
    //         align: 'left' as const,
    //     },
    //     {
    //         name: 'Value',
    //         key: 'value',
    //         align: 'left' as const,
    //     },
    //     {
    //         name: 'Actions',
    //         key: 'actions',
    //         align: 'right' as const,
    //         component: (item: any, index: number) => (
    //             <IconButton
    //                 size="small"
    //                 onClick={() => {
    //                     // Find which step contains this field
    //                     const stepIndex = reviewData.findIndex(section =>
    //                         section.fields.some(field => field.name === item.name)
    //                     );
    //                     setActiveStep(stepIndex);
    //                 }}
    //             >
    //                 <EditIcon />
    //             </IconButton>
    //         ),
    //     }
    // ];

    // const flattenedReviewData = reviewData.flatMap(section =>
    //     section.fields.map(field => ({
    //         section: section.section,
    //         name: field.name,
    //         value: field.value,
    //     }))
    // );

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
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
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                                    >
                                        <MenuItem value="json">JSON</MenuItem>
                                        <MenuItem value="xml">XML</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
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
                                        />
                                    )}
                                />
                            </Grid>
                        )}
                    </Grid>
                );

            case 2:
                return (
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
                                    sx={{ mb: 2 }}
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
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        <Box>
                            {watch('dataSchema.fields')?.map((_field, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
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
                            >
                                Add Field
                            </Button>
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Configure REST API Integration for {selectedProduct}
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
                                    {'Save & Continue'}
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

export default RestApiIntegrationSteps;