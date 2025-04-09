import { FC, ReactElement } from "react";
import { DatePicker as MUIDatepicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { OpenPickerIcon } from "@/assets/svgs/custom-icons";

type IProps = {
    label?: string;
    required?: boolean;
    onChangeValue: (value: string) => void;
    disabled?: boolean
    className?: string;
};

const DatePicker: FC<IProps> = ({
    label,
    required,
    onChangeValue,
    disabled,
    className
}): ReactElement => {
    return (
        <Box className="w-full h-full">
            {label && (
                <Typography
                    display={"flex"}
                    alignItems={"center"}
                    gap={0.5}
                    marginBottom={1}
                    variant="subtitle2"
                >
                    {label} {required && <Typography color="error">*</Typography>}
                </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MUIDatepicker
                    className={`custom-date-picker w-full ${className}`}
                    onChange={(newValue) => {
                        if (newValue) {
                            const date =
                                newValue instanceof Date ? newValue : newValue.toDate();
                            const formattedDate = date.toISOString();
                            onChangeValue(formattedDate);
                        }
                    }}
                    format="MM/dd/yyyy"
                    slots={{
                        openPickerIcon: OpenPickerIcon
                    }}
                    disabled={disabled}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default DatePicker;

