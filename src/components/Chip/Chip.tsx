import { Box, Typography } from "@mui/material";

const Chip = ({ name, className }: { name: string, className?: string }) => {
    return (
        <Box
            margin={"3px 6px"}
            className={`bg-cardBorder inline-block rounded-sm !py-1 !px-2 my-[3px] mr-1.5 ${className}`}
        >
            <Typography fontWeight={500} fontSize={14}>
                {name}
            </Typography>
        </Box>
    );
};

export default Chip;
