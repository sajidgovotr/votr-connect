import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import DatePicker from "./DatePicker";

vi.mock("@mui/x-date-pickers/LocalizationProvider", () => ({
    LocalizationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@mui/x-date-pickers/DatePicker", () => ({
    DatePicker: ({ onChange }: { onChange: (date: Date) => void }) => (
        <input
            data-testid="date-picker"
            type="date"
            onChange={(e) => onChange(new Date(e.target.value))}
        />
    ),
}));

describe("DatePicker Component", () => {
    it("should render the DatePicker component", () => {
        render(<DatePicker onChangeValue={() => { }} />);
        expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    });

    it("should display the label when provided", () => {
        render(<DatePicker label="Select Date" onChangeValue={() => { }} />);
        expect(screen.getByText("Select Date")).toBeInTheDocument();
    });

    it("should show an asterisk when required is true", () => {
        render(<DatePicker label="Select Date" required onChangeValue={() => { }} />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should call onChangeValue when a date is selected", () => {
        const mockOnChange = vi.fn();
        render(<DatePicker onChangeValue={mockOnChange} />);

        const dateInput = screen.getByTestId("date-picker");
        fireEvent.change(dateInput, { target: { value: "2025-03-10" } });

        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith(expect.stringContaining("2025-03-10"));
    });
});
