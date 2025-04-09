import { Stack, Switch, Typography } from "@mui/material";

const MUISwitch = ({
    label,
    checked,
    onChange,
    required
}: {
    label?: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent) => void;
    required?: boolean;
}) => {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Switch onChange={onChange} checked={checked} />
            {label && (
                <Typography
                    sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
                    variant="subtitle2"
                >
                    {label} {required && <Typography color="error">*</Typography>}
                </Typography>
            )}
        </Stack>
    );
};

export default MUISwitch;
