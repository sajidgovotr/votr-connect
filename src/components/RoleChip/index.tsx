import { Box } from "@mui/material";

interface RoleChipProps {
    role: "Admin" | "Developer" | "Viewer";
}

const roleStyles = {
    Admin: {
        bg: "#EFF6FF",
        color: "#2563EB"
    },
    Developer: {
        bg: "#ECFDF5",
        color: "#059669"
    },
    Viewer: {
        bg: "#FEF3C7",
        color: "#D97706"
    }
};

const RoleChip = ({ role }: RoleChipProps) => {
    const style = roleStyles[role];

    return (
        <Box
            sx={{
                backgroundColor: style.bg,
                color: style.color,
                px: 2,
                py: 0.5,
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: 500
            }}
        >
            {role}
        </Box>
    );
};

export default RoleChip; 