import { Box } from "@mui/material";

interface TagChipProps {
    text: string;
    color: string;
    bg: string;
}
const TagChip = ({ text, color, bg }: TagChipProps) => (
    <Box
        className="!inline-flex !items-center !rounded !px-2 !py-0.5 !ml-2 !text-xs !font-medium"
        sx={{ background: bg, color, border: `1px solid ${color}` }}
    >
        {text}
    </Box>
);

export default TagChip;