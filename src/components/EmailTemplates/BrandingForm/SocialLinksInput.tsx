import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import SelectBox from '@/components/SelectBox';
import AddIcon from '@mui/icons-material/Add';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const SOCIAL_OPTIONS = [
    { value: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon sx={{ color: '#0A66C2' }} /> },
    { value: 'x', label: 'X', icon: <XIcon sx={{ color: '#222' }} /> },
];

const getIcon = (type: string) => {
    if (type === 'linkedin') return <LinkedInIcon sx={{ color: '#0A66C2', fontSize: 20 }} />;
    if (type === 'x') return <XIcon sx={{ color: '#222', fontSize: 20 }} />;
    return null;
};

const SocialLinksInput = () => {
    const { control } = useFormContext();
    const { fields, append } = useFieldArray({ control, name: 'socialLinks' });

    return (
        <Box className="mb-2 !important">
            <Typography fontWeight={500} fontSize={14} className="mb-2 !important">Social Media Links</Typography>
            <Box className="flex flex-col gap-1 !important">
                {fields.map((field, idx) => (
                    <Box key={field.id} className="flex items-center gap-2 !important">
                        {/* Icon in rounded, light-gray background */}
                        <Box className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F4F4F6] !important">
                            {getIcon((fields[idx] as any)?.type)}
                        </Box>
                        <Controller
                            name={`socialLinks.${idx}.type`}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <SelectBox
                                    value={value}
                                    options={SOCIAL_OPTIONS}
                                    handleChangeValue={onChange}
                                    className="hidden" // visually hidden, only icon is shown
                                />
                            )}
                        />

                    </Box>
                ))}
            </Box>
            <MuiLink
                component="button"
                underline="none"
                color="#5263FF"
                fontWeight={500}
                fontSize={14}
                className="mt-2 !important"
                onClick={() => append({ type: 'linkedin', url: '' })}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}
            >
                <AddIcon fontSize="small" /> Add More Links
            </MuiLink>
        </Box>
    );
};

export default SocialLinksInput; 