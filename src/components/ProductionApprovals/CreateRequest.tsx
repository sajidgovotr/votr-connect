import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    Select,
    FormHelperText,
    Paper,
    Divider,
    Breadcrumbs,
    Link
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NewRequestData } from './NewRequestModal';

const CreateRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<NewRequestData>({
        name: '',
        type: '',
        environment: 'Production',
        description: '',
        changes: '',
        dependencies: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New request data:', formData);
        // In a real app, you would make an API call here to create the request
        // Then navigate back to the production approvals page
        navigate('/production-approvals');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box className="p-6">
            {/* Breadcrumbs navigation */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    color="inherit"
                    href="/production-approvals"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Production Approvals
                </Link>
            </Breadcrumbs>

            {/* Header */}
            <Typography
                variant="h4"
                sx={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 1
                }}
            >
                Create New Request
            </Typography>
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: '#6B7280',
                    mb: 4
                }}
            >
                Complete the form below to submit a new production deployment request.
            </Typography>

            {/* Main content */}
            <Paper sx={{
                borderRadius: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                p: 4,
                mb: 4
            }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '800px' }}>
                        <TextField
                            required
                            fullWidth
                            label="Request Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Shareholder API Production Release"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                sx: { color: '#4B5563', fontWeight: 500 }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '#F9FAFB',
                                    '&:hover': {
                                        backgroundColor: '#F3F4F6',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#F3F4F6',
                                    }
                                }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <FormControl required variant="filled" fullWidth>
                                <InputLabel
                                    shrink
                                    sx={{ color: '#4B5563', fontWeight: 500 }}
                                >
                                    Request Type
                                </InputLabel>
                                <Select
                                    value={formData.type}
                                    label="Request Type"
                                    name="type"
                                    displayEmpty
                                    onChange={(e) => handleChange(e as any)}
                                    sx={{
                                        backgroundColor: '#F9FAFB',
                                        '&:hover': {
                                            backgroundColor: '#F3F4F6',
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: '#F3F4F6',
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled><em>Select request type</em></MenuItem>
                                    <MenuItem value="API Release">API Release</MenuItem>
                                    <MenuItem value="Service Update">Service Update</MenuItem>
                                    <MenuItem value="Configuration Change">Configuration Change</MenuItem>
                                    <MenuItem value="Database Migration">Database Migration</MenuItem>
                                </Select>
                                <FormHelperText>Select the type of change being requested</FormHelperText>
                            </FormControl>

                            <FormControl required variant="filled" fullWidth>
                                <InputLabel
                                    shrink
                                    sx={{ color: '#4B5563', fontWeight: 500 }}
                                >
                                    Environment
                                </InputLabel>
                                <Select
                                    value={formData.environment}
                                    label="Environment"
                                    name="environment"
                                    displayEmpty
                                    onChange={(e) => handleChange(e as any)}
                                    sx={{
                                        backgroundColor: '#F9FAFB',
                                        '&:hover': {
                                            backgroundColor: '#F3F4F6',
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: '#F3F4F6',
                                        }
                                    }}
                                >
                                    <MenuItem value="Production">Production</MenuItem>
                                    <MenuItem value="Staging">Staging</MenuItem>
                                    <MenuItem value="QA">QA</MenuItem>
                                </Select>
                                <FormHelperText>Select the target environment</FormHelperText>
                            </FormControl>
                        </Box>

                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the changes..."
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                sx: { color: '#4B5563', fontWeight: 500 }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '#F9FAFB',
                                    '&:hover': {
                                        backgroundColor: '#F3F4F6',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#F3F4F6',
                                    }
                                }
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="Changes"
                            name="changes"
                            value={formData.changes}
                            onChange={handleChange}
                            placeholder="List the specific changes being made..."
                            helperText="List one change per line"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                sx: { color: '#4B5563', fontWeight: 500 }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '#F9FAFB',
                                    '&:hover': {
                                        backgroundColor: '#F3F4F6',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#F3F4F6',
                                    }
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Dependencies"
                            name="dependencies"
                            value={formData.dependencies}
                            onChange={handleChange}
                            placeholder="List any dependencies..."
                            helperText="Optional: List any service dependencies"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                sx: { color: '#4B5563', fontWeight: 500 }
                            }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '#F9FAFB',
                                    '&:hover': {
                                        backgroundColor: '#F3F4F6',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#F3F4F6',
                                    }
                                }
                            }}
                        />

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/production-approvals')}
                                sx={{
                                    color: '#374151',
                                    borderColor: '#D1D5DB',
                                    '&:hover': {
                                        borderColor: '#9CA3AF',
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: '#2563EB',
                                    }
                                }}
                            >
                                Submit Request
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateRequest; 