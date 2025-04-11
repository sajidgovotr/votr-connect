import { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import ToggleSwitch from '../ToggleSwitch';
import CustomButton from '../CustomButton';

const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Add password update logic here
        console.log('Updating password...');
    };



    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 1
                }}
            >
                Account Management
            </Typography>
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: '#6B7280',
                    mb: 4
                }}
            >
                Manage your account settings and team members.
            </Typography>

            <Box sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                p: 4
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111827',
                        mb: 3
                    }}
                >
                    Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handlePasswordUpdate}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        maxWidth: '100%'
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                mb: 1
                            }}
                        >
                            Current Password
                        </Typography>
                        <TextField
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                mb: 1
                            }}
                        >
                            New Password
                        </Typography>
                        <TextField
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                mb: 1
                            }}
                        >
                            Confirm New Password
                        </Typography>
                        <TextField
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            width: 'fit-content',
                            px: 4,
                            py: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}

                        title='Update Password'
                    />


                </Box>
            </Box>
        </Box>
    );
};

export default SecuritySettings; 