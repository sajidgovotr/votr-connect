import { useState } from 'react';
import { Box, Container, Typography, TextField, Grid, MenuItem, Card, Divider } from '@mui/material';
import { CustomButton } from '@/components';
import { useNavigate } from 'react-router';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

const STEPS = ['Company', 'Integration', 'Approval'];

const CreateClient = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const handleBack = () => {
        if (activeStep === 0) {
            navigate('/client-management');
        } else {
            setActiveStep((prev) => prev - 1);
        }
    };

    // Common text field styles
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            backgroundColor: '#F9FAFB',
            height: '48px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                backgroundColor: '#F3F4F6',
            },
            '&.Mui-focused': {
                backgroundColor: '#FFFFFF',
                '& fieldset': {
                    borderColor: '#5263FF',
                    borderWidth: '2px',
                }
            }
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 16px',
            fontSize: '15px',
            '&::placeholder': {
                color: '#9CA3AF',
                opacity: 1
            }
        },
        '& .MuiInputLabel-root': {
            color: '#4B5563',
            fontSize: '14px',
            transform: 'translate(16px, 14px) scale(1)',
            '&.Mui-focused': {
                color: '#5263FF',
                transform: 'translate(16px, -9px) scale(0.75)'
            },
            '&.MuiFormLabel-filled': {
                transform: 'translate(16px, -9px) scale(0.75)'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E7EB',
            borderWidth: '1px'
        },
        '& .MuiSelect-select': {
            padding: '12px 16px !important'
        }
    };

    // Multiline text field styles
    const multilineTextFieldStyles = {
        ...textFieldStyles,
        '& .MuiOutlinedInput-root': {
            ...textFieldStyles['& .MuiOutlinedInput-root'],
            height: 'auto',
            '& textarea': {
                padding: '12px 16px'
            }
        }
    };

    // Common section styles
    const sectionStyles = {
        p: 4,
        mb: 3,
        borderRadius: 2,
        border: '1px solid #E5E7EB',
        bgcolor: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)'
    };

    const CompanyForm = () => (
        <Box>
            <Card sx={sectionStyles}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                    Company Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            required
                            placeholder="Enter company name"
                            sx={textFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            label="Industry"
                            required
                            defaultValue=""
                            sx={textFieldStyles}
                        >
                            <MenuItem value="finance">Finance</MenuItem>
                            <MenuItem value="technology">Technology</MenuItem>
                            <MenuItem value="healthcare">Healthcare</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            label="Company Size"
                            defaultValue=""
                            sx={textFieldStyles}
                        >
                            <MenuItem value="1-50">1-50 employees</MenuItem>
                            <MenuItem value="51-200">51-200 employees</MenuItem>
                            <MenuItem value="201-500">201-500 employees</MenuItem>
                            <MenuItem value="501-1000">501-1000 employees</MenuItem>
                            <MenuItem value="1000+">1000+ employees</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={2}
                            placeholder="Enter company address"
                            sx={multilineTextFieldStyles}
                        />
                    </Grid>
                </Grid>
            </Card>

            <Card sx={sectionStyles}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Primary Contact
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            required
                            placeholder="Enter full name"
                            sx={textFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            required
                            type="email"
                            placeholder="Enter email address"
                            sx={textFieldStyles}
                        />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );

    const IntegrationForm = () => {
        const [selectedIntegration, setSelectedIntegration] = useState('rest');

        return (
            <Box>
                <Card sx={sectionStyles}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                        Integration Method
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[
                            { id: 'rest', label: 'REST API', description: 'Standard REST API integration with comprehensive documentation' },
                            { id: 'graphql', label: 'GraphQL', description: 'Flexible queries and mutations for complex data requirements' },
                            { id: 'file', label: 'File Upload', description: 'Bulk data processing and automated file synchronization' }
                        ].map((type) => (
                            <Card
                                key={type.id}
                                onClick={() => setSelectedIntegration(type.id)}
                                sx={{
                                    p: 3,
                                    flex: 1,
                                    cursor: 'pointer',
                                    bgcolor: selectedIntegration === type.id ? '#F8F9FF' : '#FFFFFF',
                                    color: '#1F2937',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: selectedIntegration === type.id ? '#5263FF' : '#E5E7EB',
                                    transition: 'all 0.2s ease-in-out',
                                    position: 'relative',
                                    '&:hover': {
                                        borderColor: '#5263FF',
                                        bgcolor: '#F8F9FF',
                                        '& .MuiRadio-root': {
                                            opacity: 1
                                        }
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <input
                                        type="radio"
                                        checked={selectedIntegration === type.id}
                                        onChange={() => setSelectedIntegration(type.id)}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            accentColor: '#5263FF',
                                            marginTop: 4
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: selectedIntegration === type.id ? 600 : 500,
                                                color: selectedIntegration === type.id ? '#5263FF' : '#1F2937',
                                                mb: 1
                                            }}
                                        >
                                            {type.label}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {type.description}
                                        </Typography>
                                    </Box>
                                </Box>
                                {type.id === 'rest' && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            px: 1.5,
                                            py: 0.5,
                                            bgcolor: '#5263FF',
                                            color: 'white',
                                            borderRadius: 1,
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}
                                    >
                                        Recommended
                                    </Box>
                                )}
                            </Card>
                        ))}
                    </Box>
                </Card>

                <Card sx={sectionStyles}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                        API Configuration
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Base URL"
                                required
                                placeholder="https://api.example.com/v1"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Authentication Method"
                                required
                                defaultValue="oauth2"
                                sx={textFieldStyles}
                            >
                                <MenuItem value="oauth2">OAuth 2.0</MenuItem>
                                <MenuItem value="apikey">API Key</MenuItem>
                                <MenuItem value="basic">Basic Auth</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Data Format"
                                defaultValue="json"
                                sx={textFieldStyles}
                            >
                                <MenuItem value="json">JSON</MenuItem>
                                <MenuItem value="xml">XML</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Rate Limit (requests/minute)"
                                type="number"
                                placeholder="Enter rate limit"
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        );
    };

    const ApprovalForm = () => {
        const [autoApprove, setAutoApprove] = useState(false);
        const [sendWelcomeEmail, setSendWelcomeEmail] = useState(false);

        return (
            <Box>
                <Card sx={sectionStyles}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                        Account Summary
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#F8F9FF', borderRadius: 2, border: '1px solid #E6E6E9' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Company Information</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Company Name</Typography>
                                        <Typography fontWeight={500}>Acme Financial</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Industry</Typography>
                                        <Typography fontWeight={500}>Finance</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Size</Typography>
                                        <Typography fontWeight={500}>500-1000 employees</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Contact</Typography>
                                        <Typography fontWeight={500}>John Smith</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#F8F9FF', borderRadius: 2, border: '1px solid #E6E6E9' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Integration Details</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Integration Type</Typography>
                                        <Typography fontWeight={500}>REST API</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Authentication</Typography>
                                        <Typography fontWeight={500}>OAuth 2.0</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Data Format</Typography>
                                        <Typography fontWeight={500}>JSON</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography color="text.secondary">Rate Limit</Typography>
                                        <Typography fontWeight={500}>1000 req/min</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                <Card sx={sectionStyles}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                        Approval Settings
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Card
                            onClick={() => setAutoApprove(!autoApprove)}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: autoApprove ? '#5263FF' : '#E5E7EB',
                                bgcolor: autoApprove ? '#F8F9FF' : '#FFFFFF',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    borderColor: '#5263FF',
                                    bgcolor: '#F8F9FF',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0px 2px 8px rgba(82, 99, 255, 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <input
                                    type="checkbox"
                                    checked={autoApprove}
                                    onChange={() => setAutoApprove(!autoApprove)}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        accentColor: '#5263FF',
                                        cursor: 'pointer',
                                        marginTop: 4
                                    }}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: autoApprove ? 600 : 500,
                                            color: autoApprove ? '#5263FF' : '#1F2937',
                                            mb: 0.5
                                        }}
                                    >
                                        Auto-approve for production
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Automatically generate and provide API credentials
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card
                            onClick={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: sendWelcomeEmail ? '#5263FF' : '#E5E7EB',
                                bgcolor: sendWelcomeEmail ? '#F8F9FF' : '#FFFFFF',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    borderColor: '#5263FF',
                                    bgcolor: '#F8F9FF',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0px 2px 8px rgba(82, 99, 255, 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <input
                                    type="checkbox"
                                    checked={sendWelcomeEmail}
                                    onChange={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        accentColor: '#5263FF',
                                        cursor: 'pointer',
                                        marginTop: 4
                                    }}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: sendWelcomeEmail ? 600 : 500,
                                            color: sendWelcomeEmail ? '#5263FF' : '#1F2937',
                                            mb: 0.5
                                        }}
                                    >
                                        Send welcome email
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Include account details and getting started guide
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Card>
            </Box>
        );
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <CompanyForm />;
            case 1:
                return <IntegrationForm />;
            case 2:
                return <ApprovalForm />;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Box sx={{ mb: 6 }}>
                    <CustomButton
                        variant="text"
                        onClick={handleBack}
                        sx={{
                            mb: 3,
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#5263FF'
                            }
                        }}
                        startIcon={<ArrowBack />}
                    >
                        Back
                    </CustomButton>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                        {activeStep === 0 && 'Create New Client Account'}
                        {activeStep === 1 && 'Configure Integration'}
                        {activeStep === 2 && 'Final Approval'}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#6B7280', maxWidth: 600 }}>
                        {activeStep === 0 && 'Set up a new client account by providing company and contact information.'}
                        {activeStep === 1 && 'Choose your preferred integration method and configure its settings.'}
                        {activeStep === 2 && 'Review all details and approve the account setup.'}
                    </Typography>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Box sx={{
                        display: 'flex',
                        position: 'relative',
                        mb: 8,
                        mt: 6,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            backgroundColor: '#E5E7EB',
                            transform: 'translateY(-50%)',
                            zIndex: 0
                        }
                    }}>
                        {STEPS.map((label, index) => (
                            <Box
                                key={label}
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                    cursor: index <= activeStep ? 'pointer' : 'default',
                                    zIndex: 1
                                }}
                                onClick={() => index <= activeStep && setActiveStep(index)}
                                onMouseEnter={() => setHoveredStep(index)}
                                onMouseLeave={() => setHoveredStep(null)}
                            >
                                <Typography
                                    sx={{
                                        mb: 2,
                                        color: index <= activeStep ? '#5263FF' : '#6B7280',
                                        fontWeight: index <= activeStep ? 600 : 500,
                                        fontSize: '14px',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {label}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        bgcolor: index <= activeStep ? '#5263FF' : '#fff',
                                        border: '2px solid',
                                        borderColor: index <= activeStep ? '#5263FF' : '#E5E7EB',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        transform: hoveredStep === index ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: hoveredStep === index ? '0px 4px 12px rgba(82, 99, 255, 0.2)' : 'none'
                                    }}
                                >
                                    {index <= activeStep ? (
                                        <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
                                    ) : (
                                        <Typography sx={{ color: '#6B7280', fontWeight: 500, fontSize: '14px' }}>
                                            {index + 1}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box marginX={'auto'}>
                        {renderStepContent()}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                            {activeStep === 2 ? (
                                <>
                                    <CustomButton
                                        variant="outlined"
                                        onClick={handleBack}
                                        sx={{
                                            borderRadius: '6px',
                                            px: 4,
                                            py: 1.5,
                                            borderColor: '#E5E7EB',
                                            color: '#4B5563',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            '&:hover': {
                                                borderColor: '#5263FF',
                                                color: '#5263FF',
                                                bgcolor: '#F8F9FF'
                                            }
                                        }}
                                        title='Previous'
                                    />


                                    <CustomButton
                                        variant="contained"
                                        onClick={() => navigate('/client-management')}
                                        sx={{
                                            borderRadius: '6px',
                                            px: 4,
                                            py: 1.5,
                                            bgcolor: '#5263FF',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            '&:hover': {
                                                bgcolor: '#4254FF'
                                            }
                                        }}
                                        title='Create Account'
                                    />


                                </>
                            ) : (
                                <CustomButton
                                    variant="contained"
                                    onClick={() => setActiveStep((prev) => prev + 1)}
                                    sx={{
                                        borderRadius: '6px',
                                        px: 4,
                                        py: 1.5,
                                        bgcolor: '#5263FF',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: '#4254FF'
                                        }
                                    }}
                                    title="Continue"
                                    endIcon={<ArrowForward />}
                                />

                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateClient; 