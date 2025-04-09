import { Stack, Typography } from "@mui/material";
import { StackChartData } from "@/types/global";

const StackedChart = ({
    data,
}: {
    data: StackChartData[];
}) => {
    return (
        <div className="chart-container">
            <div

                className="w-full flex h-7 rounded-sm overflow-hidden"
            >
                {data?.map((item, index) => {
                    return (
                        <div
                            key={`stacked${index}`}
                            style={{
                                width: `${item.value}%`,
                                background: item.color,
                            }}

                            className={`p-1 h-full `}
                        />
                    );
                })}
            </div>
            <Stack sx={{ mt: 2, px: 0.3 }} direction={"column"} spacing={0.7}>
                {data?.map((item, index) => {
                    return (
                        <div
                            key={`stackedLabels${index}`}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                                <div
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        background: item.color,
                                    }}
                                ></div>
                                <Typography
                                    color={"#717184"}
                                    fontSize={12}
                                    lineHeight={"19px"}
                                    letterSpacing={"-1%"}
                                >
                                    {item.label}
                                </Typography>
                            </div>
                            <Typography
                                fontWeight={600}
                                fontSize={"12px"}
                                lineHeight={"16.2px"}
                                letterSpacing={"-1%"}
                                color={"#1E1E1E"}
                            >
                                {item.title}
                            </Typography>
                        </div>
                    );
                })}
            </Stack>
        </div>
    );
};

export default StackedChart;
