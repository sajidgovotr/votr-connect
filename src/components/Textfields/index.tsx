import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

//can be refactored
type TInputProps = {
  label?: string;
  required?: boolean;
  type: string;
  handleChangeValue: (val: string) => void;
  value: string | number | null;
} & TextFieldProps;

export default function TextInput(props: TInputProps): ReactNode {
  const { label, type, required, handleChangeValue, value, ...rest } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: { target: { value: string } }) => {
    handleChangeValue(e.target.value);
  };

  return (<>
    {label && (
      <Typography
        sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
        fontWeight={500}
        fontSize={14}
        variant="caption"
      >
        {label} {required && <Typography color={"error"}>*</Typography>}
      </Typography>
    )}
    {type === "password" && (
      <TextField
        {...rest}
        type={showPassword ? "text" : "password"}
        fullWidth
        value={value}
        onChange={handleChange}
        required={required}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FiEyeOff size={20} color="#AEAFB3" />
                  ) : (
                    <FiEye size={20} color="#AEAFB3" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
    )}
    {type !== "password" && (
      <TextField
        {...rest}
        type={type}
        fullWidth
        value={value}
        onChange={handleChange}
        required={required}
      />
    )}
  </>);
}
