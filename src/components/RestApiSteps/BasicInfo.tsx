import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Grid, MenuItem } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BasicInfoRef, BasicInfoFormData, basicInfoSchema } from './types';

const BasicInfo = forwardRef<BasicInfoRef, {}>((props, ref) => {
    const [formData, setFormData] = useState<BasicInfoFormData | null>(null);

    const { control, handleSubmit, formState: { errors, isValid }, trigger } = useForm<BasicInfoFormData>({
        resolver: yupResolver(basicInfoSchema),
        defaultValues: {
            integrationName: 'Shareholder Data Sync',
            dataFormat: 'json',
            updateFrequency: 'daily',
            baseUrl: 'https://api.yourplatform.com/v1'
        },
        mode: 'onChange'
    });

    // Validate the form whenever it changes
    React.useEffect(() => {
        // Trigger validation on mount and when form changes
        trigger();
    }, [trigger]);

    // Expose methods to parent components
    useImperativeHandle(ref, () => ({
        isValid: () => isValid,
        getData: () => formData || {
            // Return default values if nothing has been submitted yet
            integrationName: 'Shareholder Data Sync',
            dataFormat: 'json',
            updateFrequency: 'daily',
            baseUrl: 'https://api.yourplatform.com/v1'
        }
    }));

    const onSubmit = (data: BasicInfoFormData) => {
        console.log('Basic info data:', data);
        setFormData(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} onChange={() => trigger()}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Configure REST API Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Set up your integration to receive data via REST API endpoints
            </Typography>
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
                                required
                                error={!!errors.integrationName}
                                helperText={errors.integrationName?.message}
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="dataFormat"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select
                                label="Data Format"
                                error={!!errors.dataFormat}
                                helperText={errors.dataFormat?.message}
                            >
                                <MenuItem value="json">JSON</MenuItem>
                                <MenuItem value="xml">XML</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="updateFrequency"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select
                                label="Update Frequency"
                                error={!!errors.updateFrequency}
                                helperText={errors.updateFrequency?.message}
                            >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="baseUrl"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Endpoint Base URL"
                                required
                                error={!!errors.baseUrl}
                                helperText={errors.baseUrl?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});

export default BasicInfo; 