import { Typography } from "@mui/material";
import GraphIcon from "@/assets/svgs/graph.svg";

const RevenueChip = ({ label, className }: { label: string, className?: string }) => {
    return (
        <Typography
            color="#8E9494"
            fontSize={"11.08px"}
            lineHeight={"15.83px"}
            fontWeight={500}
            className={`bg-revenueChip text-success flex items-center justify-center !px-1 gap-[0.3] rounded-[20px] ${className}`}

        >
            <img src={GraphIcon} alt="GraphIcon" /> {label}
        </Typography>
    );
};

export default RevenueChip;
