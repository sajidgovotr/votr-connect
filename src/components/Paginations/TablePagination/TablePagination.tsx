import { FC, ReactElement, useState } from "react";
import {
    Box,
    Pagination,
    Stack,
    Typography,
    Select,
    MenuItem,
    PaginationItem
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export const PaginationConstants = {
    pageNo: 1,
    pageSize: 16
};

const PaginationLimitOptionsConstants = [
    { label: "Show 16", value: "16" },
    { label: "Show 30", value: "30" },
    { label: "Show 50", value: "50" }
];

interface Props {
    limit: number;
    page: number;
    total: number;
    handlePageChange?: (newPage: number) => void;
    handleLimitChange?: (newLimit: number) => void;
}

const TablePagination: FC<Props> = ({
    limit,
    page,
    total,
    handlePageChange,
    handleLimitChange
}): ReactElement => {
    const [selectedRows, setselectedRows] = useState(PaginationConstants.pageSize);

    const totalPages = Math.ceil(total / limit);
    const startItemIndex = (page - 1) * limit + 1;
    const endItemIndex = Math.min(page * limit, total);

    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems={"center"}
            justifyContent="space-between"
            spacing={2}
        >
            <Typography fontWeight={"400"} variant="body2" color="#ADAFB9">
                Showing {startItemIndex} to {endItemIndex} of {total}
            </Typography>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, newPage: number) => {
                        handlePageChange?.(newPage);
                    }}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                previous: ArrowBackIosNew,
                                next: ArrowForwardIos
                            }}
                            {...item}
                        />
                    )}
                />
            </Box>

            <Box display={"flex"} alignItems={"center"}>
                <Typography
                    fontWeight={"400"}
                    variant="body2"
                    marginRight={"8px"}
                    color="#ADAFB9"
                >
                    Show
                </Typography>
                <Select
                    value={selectedRows}
                    onChange={(event: any) => {
                        setselectedRows(event.target.value);
                        if (handleLimitChange) {
                            handleLimitChange(Number(event.target.value));
                        }
                    }}
                    renderValue={() => {
                        return <Box px={1}>{selectedRows} Rows</Box>;
                    }}
                    sx={{
                        fontSize: "12px",
                        height: "40px",
                        "& .MuiSelect-select": {
                            padding: "4px 8px",
                            paddingLeft: "12px",
                            paddingRight: "12px"
                        }
                    }}
                >
                    {PaginationLimitOptionsConstants.map((rows) => (
                        <MenuItem key={rows.value} value={rows.value}>
                            {rows.label} Rows
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Stack>
    );
};

export default TablePagination;
