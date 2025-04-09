//only global types

export interface IBase extends Record<string, unknown> {
    id: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPagination {
    pageNo: number;
    pageSize: number;
}


interface IColumn<T> {
    name: string;
    key: keyof T | keyof T["data"] | "actions"; // Add keyof T['data']
    component?: (data: T, index?: number) => React.ReactNode;
    hideEdit?: boolean;
    hideDelete?: boolean;
    align: "left" | "center" | "right";
    sorting?: boolean;
    width?: string;
}

interface FormRef<T> {
    getState: () => T
}

interface validateFormRef<T> {
    getState: () => T
    validate: () => Promise<T>
}

interface validateRef<T> {
    validate: () => Promise<T>
}

export type IStatus = "successful" | "pending" | "failed";

import { ReactNode } from "react";

export interface ISidebarItem {
    href: string;
    icon: ReactNode | null;
    iconInactive: ReactNode | null;
    title: string;
    isSidebarExtended?: boolean;
}


export type StackChartData = {
    color: string;
    value: number;
    title: string;
    label: string;
};

interface IDynamicTable<T> {
    data: T[];
    onRowClick?: (item: T) => void;
    columns: IColumn<T>[];
    isLoading: boolean;
    limit: number;
    page: number;
    total: number;
    hidePagination?: boolean;
    handlePageChange?: (newPage: number) => void;
    handleLimitChange?: (newLimit: number) => void;
    TotalEstimatedRow?: ReactNode;
    stickyHeader?: boolean;
    renderFooter?: () => ReactNode;
    hideScrollBars?: boolean;
    isFullHeight?: boolean;
    square?: boolean;
    borderLess?: boolean;
    containerStyles?: TableContainerOwnProps["sx"];
    contentIdKey?: string;
}

export type DynamicTableProps<T> = IDynamicTable<T> & TableContainerOwnProps;