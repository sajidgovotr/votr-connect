import { TextField, TextFieldProps, Typography } from "@mui/material";

type TInputProps = {
  label?: string;
  required?: boolean;
  type: string;
  handleChangeValue: (val: string) => void;
  value: string | number | null;
} & TextFieldProps;

export default function Input(props: TInputProps) {
  const { label, type, required, handleChangeValue, value, ...rest } = props;

  const handleChange = (e: { target: { value: string } }) => {
    handleChangeValue(e.target.value);
  };

  return (
    <>
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
      <TextField
        {...rest}
        type={type}
        fullWidth
        value={value}
        onChange={handleChange}
        required={required}
        sx={{
          "& input": {
            px: 2,
            py: 1.5
          },
          "& .Mui-disabled": {
            overflow: "hidden",
            WebkitTextFillColor: "#ADAFB9"
          },
          "& .Mui-disabled > input": {
            background: "#F7F7F8"
          },
          "& .Mui-disabled > fieldset": {
            border: "1px solid #E6E6E9 !important"
          },
          ...props.sx
        }}
      />
    </>
  );
}
