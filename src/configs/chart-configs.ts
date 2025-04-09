
import { formatNumberWithSuffix } from "@/utils/helpers";
import { ApexOptions } from "apexcharts";

const StackBarChartConfig: ApexOptions = {
    noData: {
        text: "No data"
    },
    chart: {
        id: "single-bar-horizontal-stack",
        type: "bar",
        animations: {
            enabled: true,
            speed: 500,
            dynamicAnimation: {
                enabled: true,
                speed: 300
            }
        },
        offsetX: 0,
        offsetY: 0,
        sparkline: { enabled: true },
        stacked: true,
        stackOnlyBar: true,
        stackType: "100%",
        height: "100%",
        width: "100%",
        parentHeightOffset: 0,
        redrawOnParentResize: true,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        line: {
            isSlopeChart: false
        },
        bar: {
            horizontal: true,
            barHeight: "100%",
            columnWidth: "100%",
            borderRadius: 4,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last"
        }
    },
    title: {
        text: undefined
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: [""],
        labels: {
            show: false // bottom labels
        },
        axisBorder: {
            show: false // left border
        },
        axisTicks: {
            show: false // bottom border ticks
        }
    },
    yaxis: {
        title: {
            text: undefined
        },
        labels: {
            show: false // Hide category labels
        },
        axisBorder: {
            show: false // Hide the left border of the y-axis
        },
        axisTicks: {
            show: false // Hide the ticks on the y-axis
        },
        show: false
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return `${formatNumberWithSuffix(val, 2)}`;
            }
        }
    },
    fill: {
        opacity: 1
    },
    legend: {
        show: false
    },
    grid: {
        show: false
    }
};

export default StackBarChartConfig