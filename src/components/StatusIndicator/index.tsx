import { Box, Typography } from "@mui/material";

interface StatusIndicatorProps {
    status: "active" | "inactive" | "warning" | "error";
    label: string;
}

const statusColors = {
    active: "#34A853",
    inactive: "#9CA3AF",
    warning: "#F59E0B",
    error: "#DC2626"
};

const StatusIndicator = ({ status, label }: StatusIndicatorProps) => {
    return (
        <Box className="flex items-center gap-2">
            <Box
                className="w-2.5 h-2.5 rounded-full"
                sx={{ backgroundColor: statusColors[status] }}
            />
            <Typography
                sx={{
                    fontSize: "0.9375rem",
                    color: "text.primary",
                    fontWeight: 500
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export default StatusIndicator; 