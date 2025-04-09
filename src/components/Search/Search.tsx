import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { FiSearch } from "react-icons/fi";

type SInputProps = {
    handleChangeValue: (val: string) => void;
    value: string | number | null;
    iconAlign?: "left" | "right";
    whitebackground?: boolean;
} & TextFieldProps;

export default function Search(props: SInputProps) {
    const { handleChangeValue, value, iconAlign, whitebackground, ...rest } =
        props;

    return (
        (<TextField
            {...rest}
            type={"text"}
            fullWidth
            value={value}
            onChange={(e) => handleChangeValue(e.target.value)}
            sx={{
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    border: `1px solid #e6e6e9`,
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    background: whitebackground ? "#FFFFFF" : "#F9F9F9",
                    "& fieldset": {
                        border: "none"
                    },
                    height: props.size === "small" ? "46px" : undefined
                }
            }}
            slotProps={{
                input: iconAlign === "right"
                    ? {
                        endAdornment: (
                            <InputAdornment position="end" sx={{ pb: 0.5 }}>
                                <FiSearch fontSize="18px" color="#ADADAD" />
                            </InputAdornment>
                        )
                    }
                    : {
                        startAdornment: (
                            <InputAdornment position="start" sx={{ pb: 0.2 }}>
                                <FiSearch fontSize="18px" color="#ADADAD" />
                            </InputAdornment>
                        )
                    }
            }}
        />)
    );
}
