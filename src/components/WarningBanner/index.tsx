import { Box, Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface WarningBannerProps {
    message: string;
    variant?: 'warning' | 'error';
}

const variantStyles = {
    warning: {
        bg: '#FEF3C7',
        border: '#FCD34D',
        color: '#D97706',
        icon: '#F59E0B'
    },
    error: {
        bg: '#FEE2E2',
        border: '#FCA5A5',
        color: '#DC2626',
        icon: '#EF4444'
    }
};

const WarningBanner = ({ message, variant = 'warning' }: WarningBannerProps) => {
    const style = variantStyles[variant];

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                bgcolor: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: 1,
                color: style.color
            }}
        >
            <WarningAmberIcon sx={{ color: style.icon }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default WarningBanner; 