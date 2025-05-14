import { Box, Typography, Link } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '@/components/Textfields';

const MarketingLanguageInput = () => {
    const { control } = useFormContext();
    return (
        <Box className="mb-2 !important">
            <Box className="flex items-center justify-between mb-2 !important">
                <Typography fontWeight={500} fontSize={14}>Text & Language</Typography>
                <Link href="#" underline="none" fontSize={13} color="#5263FF">Add Placeholder</Link>
            </Box>
            <Controller
                name="marketingLanguage"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        value={value}
                        handleChangeValue={onChange}
                        label="Marketing Language"
                        type="text"
                        multiline
                        minRows={4}
                        className="w-full !important"
                        placeholder="This email was sent to username@email.com. If you'd rather not receive this kind of email, you can manage your email preferences."
                    />
                )}
            />
        </Box>
    );
};

export default MarketingLanguageInput; 