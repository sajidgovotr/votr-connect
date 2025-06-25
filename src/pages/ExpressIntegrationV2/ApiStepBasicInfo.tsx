import { Box, Button, Grid, MenuItem, TextField, Paper, Typography, InputAdornment, Select, FormControl, InputLabel, FormHelperText, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';
import React from 'react';

interface BasicInfoValue {
    integrationName: string;
    baseUrl: string;
    httpMethod: string;
    environment: string;
    dataFormat: string;
}

interface ApiStepBasicInfoProps {
    value: BasicInfoValue;
    onChange: (val: BasicInfoValue) => void;
    onNext: () => void;
    onBack: () => void;
}

const environments = ['Development', 'Staging', 'Production'];
const httpMethods = ['GET', 'POST', 'PUT', 'PATCH'];
const dataFormats = [
    { value: 'json', label: 'Json', icon: <TableChartIcon fontSize="small" /> },
    // Add more formats if needed
];

const ApiStepBasicInfo: React.FC<ApiStepBasicInfoProps> = ({ value, onChange, onNext, onBack }) => {
    const isFormValid = value.integrationName && value.baseUrl;

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    width: 1,
                    p: 3,
                    borderRadius: 1,
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid #e0e0e0',
                    mt: 4,
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Basic Info
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography fontWeight={500} mb={1}>
                            Integration Name<span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            placeholder="Enter name"
                            value={value.integrationName}
                            onChange={e => onChange({ ...value, integrationName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            Base URL<span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            placeholder="eg. domain.com"
                            value={value.baseUrl}
                            onChange={e => onChange({ ...value, baseUrl: e.target.value })}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">http://</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            Method
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={value.httpMethod}
                            onChange={e => onChange({ ...value, httpMethod: e.target.value })}
                        >
                            {httpMethods.map(method => (
                                <MenuItem key={method} value={method}>{method}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            Environment
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={value.environment}
                            onChange={e => onChange({ ...value, environment: e.target.value })}
                        >
                            {environments.map(env => (
                                <MenuItem key={env} value={env}>{env}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            Data Format
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={value.dataFormat}
                            onChange={e => onChange({ ...value, dataFormat: e.target.value })}
                            slotProps={{
                                select: {
                                    renderValue: (selected: unknown) => {
                                        const selectedValue = selected as string;
                                        const format = dataFormats.find(f => f.value === selectedValue);
                                        return (
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {format?.icon}
                                                <span>{format?.label}</span>
                                            </Box>
                                        );
                                    }
                                }
                            }}
                        >
                            {dataFormats.map(format => (
                                <MenuItem key={format.value} value={format.value}>
                                    {format.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>
            <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
                <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
                <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={onNext} disabled={!isFormValid}>
                    Save & Continue
                </Button>
            </Box>
        </>
    );
};

export default ApiStepBasicInfo;