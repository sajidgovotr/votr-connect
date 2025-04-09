import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Check from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import { JSX } from "react";

interface Label {
    value: string;
    label: string;
    color?: string;
    imgUrl?: string;
    disabled?: boolean;
}

type ISelectProps = {
    value: string | string[];
    options: Label[];
    label?: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    handleChangeValue: (value: string, label?: string) => void;
    placeholder?: string;
} & SelectProps;

const MuiSelect = styled(Select)(() => ({
    background: "#FFF",
    border: "1px solid #e6e6e9",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "0px",
    "& .MuiSelect-select .MuiListItemIcon-root": {
        display: "none"
    },
    "& fieldset": {
        border: "none"
    }
}));

const SelectBox = (props: ISelectProps) => {
    const {
        value,
        options,
        label,
        required,
        error,
        helperText,
        handleChangeValue,
        placeholder,
        ...rest
    } = props;
    const handleChange = (
        event: SelectChangeEvent<unknown>,
        child?: any // need to fix
    ) => {
        handleChangeValue(
            event.target.value as string,
            child.props.children as string
        );
    };

    const menuStyle = {
        maxHeight: 500
    };

    return (
        <>
            {label && (
                <Typography
                    sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
                    variant="subtitle2"
                >
                    {label} {required && <Typography color={"error"}>*</Typography>}
                </Typography>
            )}
            <FormControl fullWidth error={error}>
                <MuiSelect
                    style={{
                        display: "flex"
                    }}
                    {...rest}
                    value={value}

                    onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            style: menuStyle
                        }
                    }}
                    displayEmpty
                    renderValue={
                        value !== ""
                            ? undefined
                            : () => (
                                <span style={{ color: "#ADAFB9", fontWeight: 400 }}>
                                    {placeholder || "Please Select"}
                                </span>
                            )
                    }
                    sx={{
                        "& .MuiSelect-outlined": {
                            px: 2,
                            py: 1.2,
                            display: "flex"
                        }
                    }}
                >
                    {options?.map((option: Label): JSX.Element => {
                        return (
                            <MenuItem
                                value={option.value}
                                key={option.value}
                                disabled={option.disabled}
                                sx={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={"6px"}
                                    mr={0.8}
                                >
                                    {option.color && (
                                        <Box
                                            width={9}
                                            height={9}
                                            bgcolor={option.color}
                                            borderRadius={"2px !important"}
                                            mt={0.3}
                                        />
                                    )}
                                    {option.imgUrl && (
                                        <Box
                                            component="img"
                                            width={rest.size === "small" ? 14 : 20}
                                            height={rest.size === "small" ? 14 : 20}
                                            src={option.imgUrl}
                                            borderRadius={"99px !important"}
                                        />
                                    )}
                                    {option.label}
                                </Box>
                                {value === option.value && (
                                    <ListItemIcon>
                                        <Check />
                                    </ListItemIcon>
                                )}
                            </MenuItem>
                        );
                    })}
                </MuiSelect>
                {error && helperText !== "" && (
                    <FormHelperText
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0",
                            py: "5px",
                            gap: "3px"
                        }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: "15px" }} />
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
}
export default SelectBox