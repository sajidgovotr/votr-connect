import { Box, Typography } from "@mui/material";

interface StatusBadgeProps {
    status: "inProgress" | "completed" | "pending" | "failed";
    label: string;
}

const statusStyles = {
    inProgress: {
        bg: "#FEF3C7",
        color: "#D97706",
    },
    completed: {
        bg: "#D1FAE5",
        color: "#059669",
    },
    pending: {
        bg: "#E0E7FF",
        color: "#4F46E5",
    },
    failed: {
        bg: "#FEE2E2",
        color: "#DC2626",
    },
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    const style = statusStyles[status];

    return (
        <Box
            sx={{
                borderRadius: "9999px", // rounded-full
                px: 2, // px-4 
                py: 1, // py-1.5
                backgroundColor: style.bg,
                display: "inline-flex",
                alignItems: "center",
                gap: 1
            }}
        >
            <Typography
                sx={{
                    color: style.color,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: 1
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export default StatusBadge; 