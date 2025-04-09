import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from "@mui/material";
import { ReactNode, useState } from "react";
import EyeOffIcon from "@/assets/images/eye-off.png";
import EyeOnIcon from "@/assets/svgs/eye.svg";

type SInputProps = {
  handleChangeValue: (val: string) => void;
  value: string | number | null;
  type?: string;
  Addborder?: boolean;
  customborder?: string;
  required?: boolean;
} & TextFieldProps;

export default function ContainedTextInput(props: SInputProps): ReactNode {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    handleChangeValue,
    value,
    type,
    required,
    Addborder,
    customborder,
    ...rest
  } = props;

  return (<>
    {type === "password" && (
      <TextField
        {...rest}
        type={showPassword ? "text" : "password"}
        fullWidth
        value={value}
        required={required}
        onChange={(e) => handleChangeValue(e.target.value)}
        sx={{
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: Addborder ? "10px" : "7px",
            background: Addborder ? "#FFFFFF" : "#F9F9F9",
            border: Addborder ? "1px solid #D4D4DA" : customborder ?? "none",
            boxShadow: "0px 1px 2px 0px #1018280D",
            "& fieldset": {
              border: "none"
            }
          },
          ...rest.sx
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  <img
                    src={!showPassword ? EyeOffIcon : EyeOnIcon}
                    alt=""
                    width="20px"
                  />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    )}
    {type !== "password" && (
      <TextField
        {...rest}
        type={type || "text"}
        fullWidth
        value={value}
        required={required}
        onChange={(e) => handleChangeValue(e.target.value)}
        sx={{
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: Addborder ? "10px" : "7px",
            background: Addborder ? "#FFFFFF" : "#F9F9F9",
            border: Addborder ? "1px solid #e6e6e9" : customborder ?? "none",
            boxShadow: "0px 1px 2px 0px #1018280D",
            "& fieldset": {
              border: "none"
            }
          },
          ...rest.sx
        }}
      />
    )}
  </>);
}
