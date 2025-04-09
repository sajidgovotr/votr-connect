import { Box, Stack, Typography } from "@mui/material";
import Card from "../Card";
import RevenueChip from "../RevenueChip";
import StackedChart from "../StackedChart";
import CustomButton from "../CustomButton";
import { Add } from "@mui/icons-material";
// import Help from "../Help";

interface YearComparison {
    percentage: string;
    label: string;
}

interface ChartDataItem {
    value: number;
    color: string;
    label: string;
    title: string;
}

interface FooterStat {
    icon: string;
    label: string;
    value: string;
}

interface DashboardStatsCardProps {
    title: string;
    helpTitle?: string;
    total: string;
    yearComparison: YearComparison;
    chartData: ChartDataItem[];
    footerStats?: FooterStat[];
    handleNavigate?: () => void;
}

const DashboardStatsCard = ({
    title,
    total,
    yearComparison,
    chartData,
    footerStats,
    handleNavigate
}: DashboardStatsCardProps) => {
    return (
        <Card className="!py-[18px] !px-[22px] h-auto md:h-[400px] !bg-white">
            <Box>
                <Stack mb={0.5} >
                    <Typography fontSize={16} fontWeight={500} color="neutral.500">
                        {title}
                    </Typography>
                </Stack>
                <Typography
                    color="#1A1A1A"
                    fontWeight={700}
                    fontSize="36px"
                    letterSpacing="-0.4px"
                    lineHeight="36px"
                >
                    {total}
                </Typography>
                <Box display="flex" gap={1} mt={1.5} mb={3}>
                    <RevenueChip label={yearComparison.percentage} />
                    <Typography color="#6B7280" fontSize="14px">
                        {yearComparison.label}
                    </Typography>
                </Box>
                <StackedChart data={chartData} />
            </Box>
            {/* <hr style={{ border: "0.5px solid #E6E6E9", margin: "8px 0px 4px" }} /> */}
            {footerStats?.length ?
                <Box padding="18px 22px">
                    <Stack direction="row" justifyContent="space-between">
                        {footerStats?.map((stat, index) => (
                            <>
                                <Box key={index}>
                                    <Stack direction="row" alignItems="center" spacing={0.7}>
                                        <img src={stat.icon} alt={stat.label} />
                                        <Typography
                                            color="neutral.500"
                                            fontSize={14}
                                            fontWeight={500}
                                            lineHeight="20px"
                                            letterSpacing="-1%"
                                            textOverflow="ellipsis"
                                            sx={{ textWrap: "nowrap" }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        fontSize="26px"
                                        fontWeight={600}
                                        color="#030712"
                                        lineHeight="36px"
                                        letterSpacing="-0.4px"
                                    >
                                        {stat.value}
                                    </Typography>
                                </Box>
                                {index < footerStats.length - 1 && (
                                    <Box sx={{ border: "0.5px solid #E6E6E9" }} />
                                )}
                            </>
                        ))}
                    </Stack>
                </Box> :
                // <div className="flex justify-center">
                <CustomButton sx={{ width: '100%', mt: 4, }} variant="outlined" title="Create Campaign" startIcon={<Add />} onClick={handleNavigate} />
                // </div>
            }
        </Card>
    );
};

export default DashboardStatsCard;
