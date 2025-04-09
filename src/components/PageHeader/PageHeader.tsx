import { Stack, Typography } from "@mui/material";

const PageHeader = ({
    title,
    rightNode,
}: {
    title: string | React.ReactNode;
    rightNode?: React.ReactNode;
}) => {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
            spacing={2}
            sx={{
                mb: { xs: 2, lg: 3 },
            }}
        >
            <Typography variant="h5" flex={1}>
                {title}
            </Typography>

            {rightNode}
        </Stack>
    );
};

export default PageHeader;
