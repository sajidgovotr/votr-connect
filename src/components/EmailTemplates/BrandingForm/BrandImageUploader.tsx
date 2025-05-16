import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { useRef } from 'react';

const BrandImageUploader = () => {
    const { control, setValue } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (onChange: (file: File | null) => void, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        onChange(file);
        setValue('brandImage', file);
    };

    return (
        <Box className="mb-2 !important">
            <Box className="flex items-center justify-between mb-1 !important">
                <Typography fontSize={13} color="#8C8E9C" fontWeight={500}>
                    Brand Image <span className="text-[#8C8E9C]">(Optional)</span>
                </Typography>
                <Box className="flex items-center gap-2">
                    <MuiLink
                        component="button"
                        underline="none"
                        color="#5263FF"
                        fontWeight={500}
                        fontSize={13}
                        className="!mr-1"
                        onClick={handleUploadClick}
                    >
                        Upload New
                    </MuiLink>
                    <IconButton size="small" sx={{ color: '#EA4334' }} onClick={() => setValue('brandImage', null)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Controller
                name="brandImage"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Box
                        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E9] rounded-xl py-6 cursor-pointer !important"
                        sx={{ minHeight: 90, background: '#fff' }}
                        onClick={handleUploadClick}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => handleFileChange(onChange, e)}
                        />
                        {value ? (
                            <img
                                src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                                alt="Brand Preview"
                                className="max-h-24 max-w-full rounded-md object-contain"
                                style={{ maxHeight: 96 }}
                            />
                        ) : (
                            <Box className="flex flex-col items-center justify-center">
                                <UploadIcon sx={{ color: '#8C8E9C', fontSize: 28, mb: 0.5 }} />
                                <Typography fontSize={16} color="#8C8E9C" className="mt-1 underline cursor-pointer">
                                    Upload Image
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            />
        </Box>
    );
};

export default BrandImageUploader; 