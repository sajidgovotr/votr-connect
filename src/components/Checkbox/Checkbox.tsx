import { Checkbox as MUICheckbox, Stack, Typography } from "@mui/material";
import CheckboxIcon from "@/assets/images/checkbox.png";
import CheckboxCheckedIcon from "@/assets/images/checkbox-checked.png";
import { JSX } from "react";
import { RadioCheckedIcon, RadioUncheckedIcon } from "@/assets/svgs/custom-icons";

interface Props {
    color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
    label?: string;
    checked?: boolean;
    radioButton?: boolean;
    onChange?: () => void;
}

const Checkbox = ({
    label,
    checked,
    onChange,
    radioButton
}: Props): JSX.Element => {
    return (
        <Stack direction="row" alignItems={"center"}>
            <MUICheckbox
                checked={checked}
                onChange={onChange}
                sx={{ padding: 0 }}
                icon={
                    radioButton ? (
                        <RadioUncheckedIcon />
                    ) : (
                        <img src={CheckboxIcon} alt="" width={16} />
                    )
                }
                checkedIcon={
                    radioButton ? (
                        <RadioCheckedIcon />
                    ) : (
                        <img src={CheckboxCheckedIcon} alt="" width={16} />
                    )
                }
            />
            {label && (
                <Typography
                    variant="subtitle2"
                    fontWeight={500}
                    marginLeft={1}
                    className="text-xs lg:text-sm"

                >
                    {label}
                </Typography>
            )}
        </Stack>
    );
};

export default Checkbox;
