import React, { ReactElement, useMemo, useState } from "react";
import {
    Box,
    IconButton,
    Table as MUITable,
    Skeleton,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { TablePagination, NoData } from "@/components";
import { getCellValue } from "@/utils/helpers";
import table_sort_svg from "@/assets/svgs/table-sort.svg";
import moment from "moment";
import { DynamicTableProps, IBase } from "@/types/global";


const ROW_HEIGHT = "66px";

const DynamicTable = <T extends IBase>({
    data,
    onRowClick,
    columns,
    isLoading,
    handlePageChange,
    handleLimitChange,
    limit,
    page,
    total,
    hidePagination,
    TotalEstimatedRow,
    stickyHeader,
    renderFooter,
    hideScrollBars,
    isFullHeight,
    square,
    borderLess,
    containerStyles,
    contentIdKey,
    ...rest
}: DynamicTableProps<T>): ReactElement => {
    const extendedColumns = columns?.map((column: any) => {
        return { ...column, key: column.key.toString().split(".") };
    });

    const generateCell = <T extends IBase>(
        column: {
            key: string[];
            name: string;
            component?: (data: T, index: number) => React.ReactNode;
            hideEdit?: boolean;
            hideDelete?: boolean;
            align: "left" | "center" | "right";
            sorting?: boolean;
        },
        item: T,
        index: number
    ): React.ReactNode | string => {
        const cell = column.component
            ? column.component(item, index)
            : getCellValue(item, column.key);

        // Format Date objects to string before rendering
        if (cell instanceof Date) {
            return moment(cell).format('DD-MM-YYYY');
        }

        return cell;
    };

    const handleRequestSort = (property: string) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<string>("");

    const sortedData = useMemo(() => {
        if (!orderBy) return data;

        return data.slice().sort((a: any, b: any) => {
            const aValue = getCellValue(a, orderBy.split("."));
            const bValue = getCellValue(b, orderBy.split("."));

            if (aValue instanceof Date && bValue instanceof Date) {
                if (aValue < bValue) return order === "asc" ? -1 : 1;
                if (aValue > bValue) return order === "asc" ? 1 : -1;
                return 0;
            }

            if (aValue < bValue) return order === "asc" ? -1 : 1;
            if (aValue > bValue) return order === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, orderBy, order]);

    if (data?.length === 0 && !isLoading) {
        return <NoData />;
    }

    const renderSkeletonCells = (rowIndex: number) => {
        return columns.map((column: any, colIndex: any) => (
            <TableCell
                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                sx={{
                    height: ROW_HEIGHT,
                    width: column.width || "auto"
                }}
            >
                <Skeleton variant="rounded" height="100%" width="100%" />
            </TableCell>
        ));
    };
    const renderSkeletonRows = () => {
        return Array.from({ length: limit }, (_, rowIndex) => (
            <TableRow key={`skeleton-row-${rowIndex}`} sx={{ height: ROW_HEIGHT }}>
                {renderSkeletonCells(rowIndex)}
            </TableRow>
        ));
    };

    return (
        <>
            <Stack
                sx={{
                    ...(isFullHeight && { height: "100%", flex: 1 }),
                    ...(!square && { borderRadius: "8px" }),
                    ...(!borderLess && { border: "1px solid #e6e6e9" }),
                    ...(containerStyles && { ...containerStyles })
                }}
            >
                <TableContainer
                    {...rest}
                    className="table"
                    sx={{
                        ...(hideScrollBars && {
                            "&::-webkit-scrollbar": {
                                width: 0,
                                height: 0
                            },
                            ...(square && { borderRadius: 0 }),
                            ...rest.sx
                        })
                    }}
                >
                    <MUITable sx={{ minWidth: 650 }} stickyHeader={stickyHeader}>
                        <TableHead>
                            <TableRow>
                                {extendedColumns?.map(({ name, key, align, sorting }: any) => (
                                    <TableCell
                                        key={`table-header-${name}-${key}`}
                                        align={key[0] === "action" ? "right" : align}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent={key[0] === "action" ? "right" : align}
                                        >
                                            <Box color={"#8C8E9C"}>{name}</Box>
                                            {sorting && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRequestSort(key.join("."))}
                                                >
                                                    <img src={table_sort_svg} alt="sort icon" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading
                                ? renderSkeletonRows()
                                : sortedData?.map((item: any, index: number) => (
                                    <TableRow
                                        key={`table-content-${item?.[contentIdKey ?? ""] ?? item.id
                                            }`}
                                        sx={{
                                            cursor: onRowClick ? "pointer" : "default",
                                            height: ROW_HEIGHT
                                        }}
                                        onClick={() => {
                                            onRowClick?.(item);
                                        }}
                                    >
                                        {extendedColumns?.map((column: any) => (
                                            <TableCell
                                                key={column.key.join(".")}
                                                sx={{
                                                    borderBottom:
                                                        sortedData?.length - 1 === index
                                                            ? "none"
                                                            : "1px solid #d1d1d1",
                                                    width: column?.width ?? "auto",
                                                    height: ROW_HEIGHT
                                                }}
                                                align={
                                                    column.key[0] === "action" ? "right" : column.align
                                                }
                                            >
                                                {generateCell(column, item, index)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            {TotalEstimatedRow && (
                                <TableRow sx={{ backgroundColor: "#F0F1FF" }}>
                                    <TableCell colSpan={columns.length}>
                                        {TotalEstimatedRow}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {renderFooter?.()}
                    </MUITable>
                </TableContainer>
            </Stack>
            {!hidePagination && (
                <Box sx={{ mt: 2 }}>
                    <TablePagination
                        handlePageChange={handlePageChange}
                        handleLimitChange={handleLimitChange}
                        limit={limit}
                        page={page}
                        total={total}
                    />
                </Box>
            )}
        </>
    );
};

export default DynamicTable;
