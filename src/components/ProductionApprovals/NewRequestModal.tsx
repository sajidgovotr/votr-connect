import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Paper,
    Divider,
    SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import CustomButton from '../CustomButton';

interface NewRequestModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: NewRequestData) => void;
}

export interface NewRequestData {
    name: string;
    type: string;
    environment: string;
    description: string;
    changes: string;
    dependencies: string;
}

const NewRequestModal = ({ open, onClose, onSubmit }: NewRequestModalProps) => {
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
        onSubmit(formData);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="new-request-modal"
        >
            <Paper sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 600 },
                borderRadius: '8px',
                boxShadow: 24,
                p: 4,
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
                    Create New Request
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
                    Fill out the form below to create a new production deployment request.
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

                        <FormControl required variant="filled">
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
                                onChange={handleChange}
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

                        <FormControl required variant="filled">
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
                                onChange={handleChange}
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
                            rows={3}
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
                            rows={2}
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

                        <Divider sx={{ mt: 1 }} />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={onClose}
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
                            <CustomButton
                                type="submit"
                                variant="contained"

                                title='Create Request'
                            />
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
};

export default NewRequestModal; 