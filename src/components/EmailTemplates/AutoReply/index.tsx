import { Box, Typography } from "@mui/material";
import TextInput from '@/components/Textfields';
import { useState } from 'react';

const AutoReply = () => {
    const [value, setValue] = useState<string>(
        `Voluptate culpa qui consequat eu. Proident consectetur enim aliquip qui sunt tempor commodo velit aliqua mollit dolore enim excepteur esse. Aliqua dolor exercitation minim cillum quis ad in duis proident eu cupidatat. Commodo fugiat velit ex velit qui nulla ea excepteur ea Lorem excepteur do excepteur anim velit. In commodo magna irure aliqua Lorem sunt commodo. Anim officia officia elit.\n\nConsectetur id officia quis duis amet in esse Lorem nisi. Dolor qui consectetur est exercitation dolore pariatur aliquip. Ullamco pariatur reprehenderit ipsum et cupidatat amet ea minim reprehenderit. Culpa sint consectetur eu aliqua consectetur duis. Aute nostrud ipsum incididunt minim excepteur ad. Consequat aliqua velit nisi mollit est eiusmod id deserunt commodo laborum et proident.\n\nVelit enim deserunt reprehenderit id mollit id consectetur sint irure sint ut. Amet occaecat magna esse fugiat cupidatat mollit proident ex ut eiusmod elit est. Excepteur minim laboris laboris cillum exercitation aliqua non nostrud ea exercitation eiusmod laborum veniam. Non enim proident enim ut qui consequat sint enim commodo enim est esse aute pariatur. Lorem cillum dolore tempor laboris cupidatat qui sint ullamco proident eu aute cillum excepteur proident. Esse est proident ex nulla occaecat reprehenderit aliqua elit.\n\nIrure fugiat deserunt sint. Esse aliqua velit enim exercitation commodo excepteur.\n`);
    return (
        <Box className="w-full h-[60vh] max-w-xl mx-auto mt-8">
            <Typography fontWeight={600} fontSize={16} className="!mb-2">Auto-reply Language</Typography>
            <Box className="bg-white rounded-xl border border-gray-200 !p-4 mb-1 shadow-sm h-fit">
                <TextInput
                    label=""
                    value={value}
                    handleChangeValue={setValue}
                    type="text"
                    multiline
                    minRows={8}
                    maxRows={16}
                    className="w-full h-full !mb-2 !text-[15px] !leading-6 !p-2 !bg-transparent"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: '#F9FAFB',
                            fontSize: 15,
                            lineHeight: 1.7,
                            color: '#222',
                            padding: 0,
                        },
                        '& textarea': {
                            maxHeight: "54vh",
                            minHeight: 160,
                            overflowY: 'auto',
                            padding: '12px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#E5E7EB #F9FAFB',
                        },
                        '& textarea::-webkit-scrollbar': {
                            width: '7px',
                            borderRadius: '8px',
                            background: '#F9FAFB',
                        },
                        '& textarea::-webkit-scrollbar-thumb': {
                            background: '#E5E7EB',
                            borderRadius: '8px',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default AutoReply;