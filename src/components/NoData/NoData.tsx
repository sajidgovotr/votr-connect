import NoDataSVG from "@/assets/svgs/no-data-found.svg";
import { Box, Stack, Typography } from "@mui/material";

const NoData = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"400px"}
        >
            <Box
                component={"img"}
                src={NoDataSVG}
                width="300px"
                height="300px"
                alt="no-data"
            />
            <Typography fontWeight={500} variant="h3">
                No Data Found
            </Typography>
        </Stack>
    );
};

export default NoData;
