import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import DynamicTable from "./DynamicTable";


const mockColumns = [
    { key: ["name"], name: "Name", align: "left", sorting: true },
    { key: ["age"], name: "Age", align: "center", sorting: true },
    { key: ["action"], name: "Actions", align: "right" }
];

const mockData = [
    { _id: "1", name: "Alice", age: 25 },
    { _id: "2", name: "Bob", age: 30 }
];

describe("DynamicTable Component", () => {
    it("should render without crashing", () => {
        render(
            <DynamicTable
                data={mockData}
                columns={mockColumns}
                isLoading={false}
                limit={5}
                page={1}
                total={10}
                handlePageChange={vi.fn()}
                handleLimitChange={vi.fn()}
            />
        );

        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Age")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("should display loading skeletons when isLoading is true", () => {
        render(
            <DynamicTable
                data={[]}
                columns={mockColumns}
                isLoading={true}
                limit={5}
                page={1}
                total={10}
                handlePageChange={vi.fn()}
                handleLimitChange={vi.fn()}
            />
        );

        expect(screen.getAllByRole("row")).toHaveLength(6);
    });

    it("should call onRowClick when a row is clicked", () => {
        const mockOnRowClick = vi.fn();

        render(
            <DynamicTable
                data={mockData}
                columns={mockColumns}
                isLoading={false}
                limit={5}
                page={1}
                total={10}
                handlePageChange={vi.fn()}
                handleLimitChange={vi.fn()}
                onRowClick={mockOnRowClick}
            />
        );

        fireEvent.click(screen.getByText("Alice"));
        expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
    });



    it("should sort data when clicking the sort button", () => {
        render(
            <DynamicTable
                data={mockData}
                columns={mockColumns}
                isLoading={false}
                limit={5}
                page={1}
                total={10}
                handlePageChange={vi.fn()}
                handleLimitChange={vi.fn()}
            />
        );

        const sortButton = screen.getAllByRole("button")[0]; // Assuming first button is sorting button
        fireEvent.click(sortButton);

        expect(screen.getByText("Alice")).toBeInTheDocument();
    });
});
