import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MUITimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { OpenPickerIcon } from "@/assets/svgs/custom-icons";

interface IProps {
    label: string;
    value: string;
    onChangeValue: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}

const TimePicker: React.FC<IProps> = ({
    label,
    value: propValue,
    onChangeValue,
    required = false,
    disabled = false,
    error = false,
    helperText
}) => {
    const [value, setValue] = useState<Dayjs | null>(
        propValue ? dayjs(propValue, "HH:mm") : null
    );

    useEffect(() => {
        setValue(propValue ? dayjs(propValue, "HH:mm") : null);
    }, [propValue]);

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        onChangeValue(newValue ? newValue.format("HH:mm") : "");
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MUITimePicker
                    label={label}
                    value={value}
                    onChange={handleChange}
                    sx={{
                        width: "100%",
                        "& .MuiIconButton-root": {
                            color: "#1A1A1A",
                            fontSize: 20,
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: error ? "error.main" : "rgba(0, 0, 0, 0.23)",
                            },
                            "&:hover fieldset": {
                                borderColor: error ? "error.main" : "rgba(0, 0, 0, 0.87)",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: error ? "error.main" : "primary.main",
                            },
                        },
                        "& .Mui-disabled": {
                            backgroundColor: "#F5F5F5",
                        },
                        "& fieldset": {
                            borderRadius: "8px",
                        },
                        "& input::placeholder": {
                            color: "#1A1A1A",
                            opacity: 1,
                        },
                    }}
                    slots={{ openPickerIcon: OpenPickerIcon }}
                    disabled={disabled}
                />
            </LocalizationProvider>
            {helperText && (
                <Typography
                    color={"error"}
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        bottom: -30,
                        left: 14,
                        color: "red"
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default TimePicker;

