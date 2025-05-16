import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import SelectBox from '@/components/SelectBox';

const FONT_OPTIONS = [
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Open Sans', label: 'Open Sans' },
];

const FontDropdown = () => {
    const { control } = useFormContext();
    return (
        <Box className="mb-2 !important">
            <Typography fontWeight={500} fontSize={14} className="mb-2 !important">Font</Typography>
            <Controller
                name="font"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <SelectBox
                        value={value}
                        options={FONT_OPTIONS}
                        handleChangeValue={onChange}
                        placeholder="Select Font"
                        className="w-full !important"
                    />
                )}
            />
        </Box>
    );
};

export default FontDropdown; 