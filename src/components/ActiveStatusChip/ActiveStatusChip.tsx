import { Box, Typography } from "@mui/material";

const ActiveStatusChip = ({ isActive }: { isActive: boolean }) => {
    return (
        <Box

            className={`flex w-[100px] py-2 px-4 justify-center items-center gap-1 rounded-4xl border border-cardBorder bg-white shadow-statusChip`}

        >
            <Typography
                color={isActive ? "#34A853" : "#030712"}
                fontSize={14}
                fontWeight={500}
            >
                {isActive ? "Active" : "Inactive"}
            </Typography>
        </Box>
    );
};

export default ActiveStatusChip;
