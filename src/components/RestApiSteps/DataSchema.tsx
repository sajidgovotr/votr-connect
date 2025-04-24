import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    MenuItem,
    Button,
    Alert,
    IconButton,
    Checkbox,
    FormControlLabel,
    Card,
    Divider
} from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataSchemaRef, SchemaFormData, schemaSchema } from './types';

const DataSchema = forwardRef<DataSchemaRef, {}>((_, ref) => {
    const [formData, setFormData] = useState<SchemaFormData | null>(null);

    const { control, handleSubmit, formState: { errors, isValid }, trigger } = useForm<SchemaFormData>({
        resolver: yupResolver(schemaSchema),
        defaultValues: {
            resourceName: 'Shareholders',
            endpointPath: '/shareholders',
            fields: [
                { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
                { name: 'name', type: 'string', required: true, description: 'Shareholder\'s full name' }
            ]
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields'
    });

    // Validate the form whenever it changes
    React.useEffect(() => {
        // Trigger validation on mount and when form changes
        trigger();
    }, [trigger]);

    // Expose isValid method to parent components
    useImperativeHandle(ref, () => ({
        isValid: () => isValid,
        getData: () => formData || {
            resourceName: 'Shareholders',
            endpointPath: '/shareholders',
            fields: [
                { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
                { name: 'name', type: 'string', required: true, description: 'Shareholder\'s full name' }
            ]
        }
    }));

    const onSubmit = (data: SchemaFormData) => {
        console.log('Schema data:', data);
        setFormData(data);
    };

    const addField = () => {
        append({ name: '', type: 'string', required: false, description: '' });
    };

    // Helper function to safely get error message
    const getErrorMessage = (error: any): string => {
        return error && typeof error === 'object' && 'message' in error
            ? error.message
            : '';
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} onChange={() => trigger()}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Configure REST API Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Define the data schema for your integration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        name="resourceName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Resource Name"
                                required
                                error={!!errors.resourceName}
                                helperText={getErrorMessage(errors.resourceName)}
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="endpointPath"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Endpoint Path"
                                required
                                error={!!errors.endpointPath}
                                helperText={getErrorMessage(errors.endpointPath)}
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Field Definitions
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={addField}
                            size="small"
                        >
                            Add Field
                        </Button>
                    </Box>

                    {!!errors.fields && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            At least one field is required
                        </Alert>
                    )}

                    {fields.map((field, index) => (
                        <Card key={field.id} sx={{ p: 2, mb: 2, border: '1px solid #E5E7EB', boxShadow: 'none' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    Field {index + 1}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => remove(index)}
                                    disabled={fields.length <= 1}
                                    sx={{ color: 'error.main' }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name={`fields.${index}.name`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Field Name"
                                                size="small"
                                                required
                                                error={!!errors.fields?.[index]?.name}
                                                helperText={getErrorMessage(errors.fields?.[index]?.name)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name={`fields.${index}.type`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                select
                                                label="Field Type"
                                                size="small"
                                                required
                                                error={!!errors.fields?.[index]?.type}
                                                helperText={getErrorMessage(errors.fields?.[index]?.type)}
                                            >
                                                <MenuItem value="string">String</MenuItem>
                                                <MenuItem value="number">Number</MenuItem>
                                                <MenuItem value="boolean">Boolean</MenuItem>
                                                <MenuItem value="date">Date</MenuItem>
                                                <MenuItem value="array">Array</MenuItem>
                                                <MenuItem value="object">Object</MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name={`fields.${index}.description`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Description"
                                                size="small"
                                                error={!!errors.fields?.[index]?.description}
                                                helperText={getErrorMessage(errors.fields?.[index]?.description)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name={`fields.${index}.required`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                }
                                                label="Required field"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
});

export default DataSchema; 