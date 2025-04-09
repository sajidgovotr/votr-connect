import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import TablePagination from "./TablePagination";


describe("TablePagination Component", () => {
    it("should render the TablePagination component", () => {
        render(<TablePagination limit={10} page={1} total={100} />);
        expect(screen.getByText(/Showing 1 to 10 of 100/i)).toBeInTheDocument();
    });

    it("should call handlePageChange when pagination is changed", () => {
        const handlePageChange = vi.fn();
        render(<TablePagination limit={10} page={1} total={100} handlePageChange={handlePageChange} />);

        const nextButton = screen.getByRole("button", { name: /next/i });
        fireEvent.click(nextButton);

        expect(handlePageChange).toHaveBeenCalled();
    });
});