import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox Component", () => {
    it("should render the checkbox", () => {
        render(<Checkbox label="Accept Terms" />);
        expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    });

    it("should render the checkbox as checked", () => {
        render(<Checkbox label="Checked" checked />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    it("should call onChange when clicked", () => {
        const mockOnChange = vi.fn();
        render(<Checkbox label="Click me" onChange={mockOnChange} />);

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalled();
    });

    it("should render radio button icons when radioButton is true", () => {
        render(<Checkbox label="Radio Option" radioButton />);
        expect(screen.getByText("Radio Option")).toBeInTheDocument();
    });
});
