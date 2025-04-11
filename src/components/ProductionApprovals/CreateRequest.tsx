import {
    Box,
    Typography,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Paper,
    Divider,
    Breadcrumbs,
    Link,
    SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NewRequestData } from './NewRequestModal';
import ContainedTextInput from '../Textfields/contained';
import CustomButton from '../CustomButton';

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

    const handleChange = (name: string) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const name = e.target.name as string;
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box>
            {/* Breadcrumbs navigation */}
            <Breadcrumbs>
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
                        <ContainedTextInput
                            required
                            fullWidth
                            label="Request Name"
                            name="name"
                            type="text"
                            value={formData.name}
                            handleChangeValue={handleChange('name')}
                            placeholder="e.g., Shareholder API Production Release"
                            Addborder
                        />

                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <FormControl required fullWidth>
                                <Typography
                                    sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                                    fontWeight={500}
                                    fontSize={14}
                                    variant="caption"
                                >
                                    Request Type <Typography color="error">*</Typography>
                                </Typography>
                                <Select<string>
                                    value={formData.type}
                                    name="type"
                                    displayEmpty
                                    onChange={handleSelectChange}
                                    sx={{
                                        borderRadius: '10px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            background: '#FFFFFF',
                                            border: '1px solid #e6e6e9',
                                            boxShadow: '0px 1px 2px 0px #1018280D',
                                            '& fieldset': {
                                                border: 'none'
                                            }
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

                            <FormControl required fullWidth>
                                <Typography
                                    sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                                    fontWeight={500}
                                    fontSize={14}
                                    variant="caption"
                                >
                                    Environment <Typography color="error">*</Typography>
                                </Typography>
                                <Select<string>
                                    value={formData.environment}
                                    name="environment"
                                    displayEmpty
                                    onChange={handleSelectChange}
                                    sx={{
                                        borderRadius: '10px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            background: '#FFFFFF',
                                            border: '1px solid #e6e6e9',
                                            boxShadow: '0px 1px 2px 0px #1018280D',
                                            '& fieldset': {
                                                border: 'none'
                                            }
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

                        <ContainedTextInput
                            required
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            type="text"
                            value={formData.description}
                            handleChangeValue={handleChange('description')}
                            placeholder="Provide a detailed description of the changes..."
                            Addborder
                        />

                        <ContainedTextInput
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="Changes"
                            name="changes"
                            type="text"
                            value={formData.changes}
                            handleChangeValue={handleChange('changes')}
                            placeholder="List the specific changes being made..."
                            helperText="List one change per line"
                            Addborder
                        />

                        <ContainedTextInput
                            fullWidth
                            multiline
                            rows={3}
                            label="Dependencies"
                            name="dependencies"
                            type="text"
                            value={formData.dependencies}
                            handleChangeValue={handleChange('dependencies')}
                            placeholder="List any dependencies..."
                            helperText="Optional: List any service dependencies"
                            Addborder
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
                            <CustomButton title='submite' variant='contained' />
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateRequest; 