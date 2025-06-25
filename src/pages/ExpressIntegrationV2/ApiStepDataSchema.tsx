import { Box, Button, Grid, MenuItem, TextField, Paper, Typography, InputAdornment, IconButton, Switch } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface DataField {
    mapping: string;
    fieldName: string;
    type: string;
    required: boolean;
}

interface DataSchemaValue {
    schemaName: string;
    fields: DataField[];
    endpoint?: string;
}

interface ApiStepDataSchemaProps {
    value: DataSchemaValue;
    onChange: (val: DataSchemaValue) => void;
    onNext: () => void;
    onBack: () => void;
}

const schemaOptions = [
    { value: 'shareholders', label: 'Shareholders', icon: <GroupIcon fontSize="small" /> },
    // Add more schemas if needed
];

const mappingOptions = [
    { value: 'cusip', label: 'CUSIP No.' },
    { value: 'account', label: 'Account No.' },
    { value: 'name', label: 'Name' },
    // Add more mappings as needed
];

const typeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    // Add more types as needed
];

const defaultField: DataField = { mapping: '', fieldName: '', type: '', required: false };

const ApiStepDataSchema: React.FC<ApiStepDataSchemaProps> = ({ value, onChange, onNext, onBack }) => {
    const handleFieldChange = (idx: number, key: keyof DataField, val: any) => {
        const updatedFields = value.fields.map((f: DataField, i: number) => i === idx ? { ...f, [key]: val } : f);
        onChange({ ...value, fields: updatedFields });
    };
    const handleAddField = () => {
        onChange({ ...value, fields: [...value.fields, { ...defaultField }] });
    };
    const handleDeleteField = (idx: number) => {
        onChange({ ...value, fields: value.fields.filter((_, i: number) => i !== idx) });
    };
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
                }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Data Schema Configuration
                </Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            Schema Name
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={value.schemaName}
                            onChange={e => onChange({ ...value, schemaName: e.target.value })}
                            slotProps={{
                                select: {
                                    renderValue: (selected: unknown) => {
                                        const selectedValue = selected as string;
                                        const schema = schemaOptions.find(s => s.value === selectedValue);
                                        return (
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {schema?.icon}
                                                <span>{schema?.label}</span>
                                            </Box>
                                        );
                                    }
                                }
                            }}
                        >
                            {schemaOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={500} mb={1}>
                            End Point
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="eg. domain.com"
                            value={value.endpoint || ''}
                            onChange={e => onChange({ ...value, endpoint: e.target.value })}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">http://</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={0} sx={{ width: 1, p: 0, borderRadius: 1, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0', mt: 4 }}>
                <Box px={3} pt={3}>
                    <Typography variant="h5" fontWeight={700} mb={0.5}>
                        Data Fields
                    </Typography>
                    <Typography variant="body2" color="#AEB0B4" mb={2}>
                        Duis consectetur labore qui ullamco. Nisi sunt do culpa magna nisi.
                    </Typography>
                </Box>
                <Box mt={1} mb={2} mx={0} sx={{ borderBottom: '1px solid #E6E7E8' }} />
                <Grid container spacing={2} alignItems="center" px={3} pb={2}>
                    <Grid item xs={12} md={3}>
                        <Typography color="#AEB0B4" fontWeight={500} mb={1}>Mapping</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography color="#AEB0B4" fontWeight={500} mb={1}>Field Name</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography color="#AEB0B4" fontWeight={500} mb={1}>Type</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography color="#AEB0B4" fontWeight={500} mb={1}>Required</Typography>
                    </Grid>
                    <Grid item xs={6} md={1}></Grid>
                </Grid>
                {value.fields.map((field: DataField, idx: number) => (
                    <Grid container spacing={2} alignItems="center" key={idx} mb={1} px={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                value={field.mapping}
                                onChange={e => handleFieldChange(idx, 'mapping', e.target.value)}
                                slotProps={{ select: { displayEmpty: true } }}
                                sx={{
                                    background: '#FAFAFB',
                                    borderRadius: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>Select Mapping</MenuItem>
                                {mappingOptions.map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Enter Field Name"
                                value={field.fieldName}
                                onChange={e => handleFieldChange(idx, 'fieldName', e.target.value)}
                                sx={{
                                    background: '#FAFAFB',
                                    borderRadius: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                value={field.type}
                                onChange={e => handleFieldChange(idx, 'type', e.target.value)}
                                slotProps={{ select: { displayEmpty: true } }}
                                sx={{
                                    background: '#FAFAFB',
                                    borderRadius: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>Select Type</MenuItem>
                                {typeOptions.map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={2} display="flex" alignItems="center">
                            <Switch
                                checked={field.required}
                                onChange={e => handleFieldChange(idx, 'required', e.target.checked)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={6} md={1} display="flex" alignItems="center">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteField(idx)}
                                // disabled={value.fields.length <= 1}
                                sx={{
                                    border: `2px solid #E6E7E8`,
                                    background: '#F5F5F5',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
                                    color: '#B0B3C7',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        border: `2px solid #FF4D4F`,
                                        color: '#FF4D4F',
                                        background: '#fff',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Box mt={2} px={3} pb={3}>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleAddField}
                        sx={{ fontWeight: 600, textTransform: 'none', fontSize: 18, pl: 0 }}
                        startIcon={<Box component="span" sx={{ color: '#5563F7', fontSize: 28, display: 'flex', alignItems: 'center' }}>+</Box>}
                    >
                        Add Filed
                    </Button>
                </Box>
            </Paper>

            <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
                <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
                <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={onNext}>
                    Save & Continue
                </Button>
            </Box>
        </>
    );
};

export default ApiStepDataSchema; 