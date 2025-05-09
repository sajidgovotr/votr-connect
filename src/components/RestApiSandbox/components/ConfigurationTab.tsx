import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import CustomButton from '../../CustomButton';

interface ConfigurationTabProps {
    onSave: () => void;
}

const ConfigurationTab = ({
    onSave
}: ConfigurationTabProps) => {
    const { register, setValue, watch } = useFormContext();
    const authType = watch("authType");

    return (
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
                    mb: 4
                }}
            >
                Endpoint Configuration
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                    Base URL
                </Typography>
                <TextField
                    fullWidth
                    {...register("baseUrl", { required: "Base URL is required" })}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            '& fieldset': { borderColor: '#E5E7EB' },
                            '&:hover fieldset': { borderColor: '#D1D5DB' },
                        },
                    }}
                />
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 3
                }}
            >
                Authentication
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3, mb: 3 }}>
                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Authentication Type
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        value={authType}
                        onChange={(e) => setValue("authType", e.target.value)}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    >
                        <MenuItem value="API Key">API Key</MenuItem>
                    </TextField>
                </Box>

                {authType === "API Key" && (
                    <Box>
                        <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                            API Key
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            {...register("apiKey", { required: "API Key is required" })}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': { borderColor: '#E5E7EB' },
                                    '&:hover fieldset': { borderColor: '#D1D5DB' },
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    variant="contained"
                    onClick={onSave}
                    sx={{ color: 'white', textTransform: 'none', px: 4 }}
                    title="Save"
                />
            </Box>
        </Box>
    );
};

export default ConfigurationTab; 