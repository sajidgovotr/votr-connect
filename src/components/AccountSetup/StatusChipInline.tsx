import { Box } from "@mui/material";

interface StatusChipInlineProps {
    icon: React.ReactNode;
    text: string;
    color: string;
    bg: string;
}
const StatusChipInline = ({ icon, text, color, bg }: StatusChipInlineProps) => (
    <Box
        className="!inline-flex !items-center !rounded !px-2 !py-0.5 !ml-1 !text-xs !font-medium"
        sx={{ background: bg, color, border: `1px solid ${color}` }}
    >
        {icon}
        <span className="!ml-1">{text}</span>
    </Box>
);

export default StatusChipInline;