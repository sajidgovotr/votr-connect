import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ImageUploader from '@/components/ImageUploader';

const BusinessLogoUploader = () => {
    const { control } = useFormContext();
    return (
        <Box className="mb-2 !important">
            <Typography fontWeight={500} fontSize={14} className="mb-2 !important">Business Logo</Typography>
            <Controller
                name="businessLogo"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <ImageUploader
                        file={value}
                        onChange={onChange}
                        maxSize={1024 * 1024}
                        height={120}
                    />
                )}
            />
            <Typography fontSize={12} color="#8C8E9C" className="mt-1 !important">
                Preferred Image Dimensions: 5000 x 500 pixels @ 72 DPI. Maximum File Size: 1MB
            </Typography>
        </Box>
    );
};

export default BusinessLogoUploader; 