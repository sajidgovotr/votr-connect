import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const minDistance = 10;

export default function RangeSlider({
    value,
    onChange,
    dataTestId
}: {
    value: number[];
    onChange: (newVal: number[]) => void;
    dataTestId?: string;
}) {
    const handleChange = (
        _event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            onChange([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            onChange([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return (
        <Box
            width={"100%"}
        >
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={1000}
                data-testid={dataTestId}
            />
        </Box>
    );
}
