import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MUITimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { OpenPickerIcon } from "@/assets/svgs/custom-icons";

type IProps = {
    label?: string;
    required?: boolean;
    value?: string;
    onChangeValue: (value: string) => void;
    disabled?: boolean
};

export default function TimePicker({
    label,
    required,
    onChangeValue,
    value: propValue,
    disabled
}: IProps) {
    const [value, setValue] = useState<Dayjs | null>(
        propValue ? dayjs(propValue, "HH:mm") : null
    );

    useEffect(() => {
        if (propValue !== value?.format("HH:mm")) {
            setValue(propValue ? dayjs(propValue, "HH:mm") : null);
        }
    }, [propValue]);

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            {label && (
                <Typography
                    sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
                    variant="subtitle2"
                >
                    {label} {required && <Typography color="error">*</Typography>}
                </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MUITimePicker
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        onChangeValue(newValue ? newValue.format("HH:mm") : "");
                    }}
                    sx={{
                        width: "100%",
                        "& .MuiIconButton-root": {
                            color: "#1A1A1A",
                            fontSize: 18
                        },
                        "& .MuiOutlinedInput-root": {
                            border: "1px solid #e6e6e9",
                            boxShadow: "none",
                            "& input": {
                                px: 2,
                                py: 1.5
                            }
                        },
                        "& .Mui-disabled": {
                            background: "#F7F7F8",
                            WebkitTextFillColor: "#ADAFB9",
                            overflow: "hidden"
                        },
                        "& fieldset": {
                            border: "none"
                        },
                        "& input::placeholder": {
                            color: "#ADAFB9",
                            opacity: 1
                        }
                    }}
                    slots={{ openPickerIcon: OpenPickerIcon }}
                    disabled={disabled}
                />
            </LocalizationProvider>
        </Box>
    );
}

