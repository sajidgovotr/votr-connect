import { Box, Grid2, TextField, Typography } from "@mui/material";
import { Card, CustomButton } from "@/components";

interface CompanyFormProps {
    onSubmit: (data: any) => void;
}

const CompanyForm = ({ onSubmit }: CompanyFormProps) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add form submission logic
        onSubmit({});
    };

    return (
        <Card>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        mb: 3,
                        color: "#111827"
                    }}
                >
                    Company Information
                </Typography>

                <Grid2 container spacing={3}>
                    <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            defaultValue="John Partners Inc."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2563EB',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6B7280',
                                }
                            }}
                        />
                    </Grid2>
                    <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Industry"
                            defaultValue="Finance"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2563EB',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6B7280',
                                }
                            }}
                        />
                    </Grid2>
                    <Grid2 component="div" size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            defaultValue="123 Business Ave, Suite 400"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2563EB',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6B7280',
                                }
                            }}
                        />
                    </Grid2>
                </Grid2>

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        mb: 3,
                        mt: 4,
                        color: "#111827"
                    }}
                >
                    Primary Contact
                </Typography>

                <Grid2 container spacing={3}>
                    <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            defaultValue="John Parker"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2563EB',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6B7280',
                                }
                            }}
                        />
                    </Grid2>
                    <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            defaultValue="john@partnersco.com"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2563EB',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6B7280',
                                }
                            }}
                        />
                    </Grid2>
                </Grid2>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: '#2563EB',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                bgcolor: '#1D4ED8',
                            },
                            px: 4
                        }}
                        title="Save Changes"
                    />


                </Box>
            </Box>
        </Card>
    );
};

export default CompanyForm; 