import { Box, Typography, IconButton, Button } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useRef, useState } from 'react';

const COLORS = [
    '#EB4334', // red
    '#FABB05', // yellow
    '#222222', // black
    '#FF9900', // orange
    '#F28B82', // pink
];

const BrandColorPicker = () => {
    const { control, setValue } = useFormContext();
    const colorInputRef = useRef<HTMLInputElement>(null);
    const [showColorInput, setShowColorInput] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);

    // When a swatch or add is clicked, open the color picker
    const openColorPicker = () => {
        setShowColorInput(true);
        setTimeout(() => {
            colorInputRef.current?.focus();
            colorInputRef.current?.click();
        }, 0);
    };

    // When a color is picked, update the form value
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
        onChange(e.target.value);
        setValue('brandColor', e.target.value);
        setShowColorInput(false);
    };

    // Prevent closing on click inside the color input
    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsInteracting(true);
        setTimeout(() => setIsInteracting(false), 200);
    };

    // Only close if not interacting
    const handleInputBlur = () => {
        setTimeout(() => {
            if (!isInteracting) setShowColorInput(false);
        }, 120);
    };

    return (
        <Box className="mb-2 !important">
            <Typography fontWeight={500} fontSize={14} className="mb-2 !important">Primary Brand Color</Typography>
            <Controller
                name="brandColor"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Box className="flex items-center gap-3 !important relative">
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                borderRadius: '20px',
                                fontWeight: 500,
                                color: '#EA4334',
                                borderColor: '#EA4334',
                                px: 2,
                                py: 0.5,
                                minWidth: 0,
                                fontSize: 13,
                                textTransform: 'none',
                            }}
                            className="!rounded-full !h-8 !min-w-0"
                            onClick={openColorPicker}
                        >
                            Extracted from Logo
                        </Button>
                        {COLORS.map((color) => (
                            <Box
                                key={color}
                                className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center !important ${value === color ? 'border-[#5263FF] border-2' : 'border-[#E6E6E9]'}`}
                                style={{ background: color }}
                                onClick={openColorPicker}
                            />
                        ))}
                        {/* Add button with color picker below */}
                        <Box className="relative">
                            <IconButton size="small" className="ml-1 !important" onClick={openColorPicker}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                            {showColorInput && (
                                <input
                                    ref={colorInputRef}
                                    type="color"
                                    value={value || COLORS[0]}
                                    onChange={e => handleColorChange(e, onChange)}
                                    onBlur={handleInputBlur}
                                    onClick={handleInputClick}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '110%',
                                        zIndex: 10,
                                        width: 36,
                                        height: 36,
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        borderRadius: 8,
                                    }}
                                    autoFocus
                                />
                            )}
                        </Box>
                    </Box>
                )}
            />
        </Box>
    );
};

export default BrandColorPicker; 