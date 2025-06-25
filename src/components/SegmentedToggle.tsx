import React from 'react';
import { Box, Typography } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface SegmentedToggleProps {
    label: string;
    info?: boolean;
    options: { label: string; value: any }[];
    value: any;
    onChange: (val: any) => void;
    sx?: object;
}

const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
    label,
    // info,
    options,
    value,
    onChange,
    sx = {},
}) => (
    <Box>
        <Box display="flex" alignItems="center" mb={1}>
            <Typography fontWeight={500} mr={1}>
                {label}
            </Typography>
            {/* {info && <InfoOutlinedIcon sx={{ color: '#B0B3C7', fontSize: 20 }} />} */}
        </Box>
        <Box
            display="flex"
            sx={{
                border: '1.5px solid #E6E7E8',
                borderRadius: '16px',
                background: '#F8F8FA',
                width: 1,
                height: 56,
                overflow: 'hidden',
                ...sx,
            }}
        >
            {options.map((opt, idx) => {
                const selected = value === opt.value;
                return (
                    <Box
                        key={opt.value}
                        flex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            background: selected ? '#fff' : 'transparent',
                            color: selected ? '#181A20' : '#AEB0B4',
                            fontSize: 16,
                            borderRadius: selected ? '12px' : 0,
                            boxShadow: selected ? '0 0 0 1px #E6E7E8' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            m: 0.5,
                        }}
                        onClick={() => onChange(opt.value)}
                    >
                        {opt.label}
                    </Box>
                );
            })}
        </Box>
    </Box>
);

export default SegmentedToggle; 