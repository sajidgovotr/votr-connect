import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import CustomDateRangePicker from "./CustomDateRangePicker";
import userEvent from "@testing-library/user-event";

describe("CustomDateRangePicker Component", () => {
    it("should render the CustomDateRangePicker component", () => {
        render(<CustomDateRangePicker onDateSelect={vi.fn()} />);
        expect(screen.getByText("Show:")).toBeInTheDocument();
    });

    it("should toggle the date picker on click", async () => {
        render(<CustomDateRangePicker onDateSelect={vi.fn()} />);
        const trigger = screen.getByText("Show:");

        await userEvent.click(trigger);
        expect(screen.getByText("Today")).toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.queryByText("Today")).not.toBeInTheDocument();
    });

    it("should select a preset date range", async () => {
        const mockOnDateSelect = vi.fn();
        render(<CustomDateRangePicker onDateSelect={mockOnDateSelect} />);

        await userEvent.click(screen.getByText("Show:"));
        const presetOption = screen.getByText("This Week");

        await userEvent.click(presetOption);
        expect(presetOption).toHaveClass("Mui-selected");
    });

    it("should call onDateSelect when clicking Apply", async () => {
        const mockOnDateSelect = vi.fn();
        render(<CustomDateRangePicker onDateSelect={mockOnDateSelect} />);

        await userEvent.click(screen.getByText("Show:"));
        await userEvent.click(screen.getByText("Apply"));

        expect(mockOnDateSelect).toHaveBeenCalled();
    });

    it("should close the picker when clicking outside", async () => {
        render(<CustomDateRangePicker onDateSelect={vi.fn()} />);
        await userEvent.click(screen.getByText("Show:"));

        fireEvent.mouseDown(document.body); // Simulates clicking outside

        expect(screen.queryByText("Today")).not.toBeInTheDocument(); // Picker closes
    });
});
