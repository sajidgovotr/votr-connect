import { Box } from '@mui/material';
import CustomButton from '@/components/CustomButton';

const FormActions = () => {
    return (
        <Box className="flex justify-end gap-3 mt-4 !important">
            <CustomButton
                title="Open Preview"
                variant="outlined"
                sx={{ borderRadius: '8px', minWidth: 140, fontWeight: 500, color: '#111827', borderColor: '#E6E6E9' }}
                className="!rounded-lg"
            />
            <CustomButton
                title="Save & Publish"
                variant="contained"
                sx={{ borderRadius: '8px', minWidth: 160, fontWeight: 500, bgcolor: '#5263FF', color: '#fff', '&:hover': { bgcolor: '#3B4FC4' } }}
                className="!rounded-lg"
                type="submit"
            />
        </Box>
    );
};

export default FormActions; 