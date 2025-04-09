import { render, screen, fireEvent } from "@testing-library/react";
import SelectBox from "@/components/SelectBox";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom"; // Ensure this is imported

describe("SelectBox Component", () => {
    const mockHandleChangeValue = vi.fn();

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3", disabled: true }
    ];

    it("renders correctly with placeholder", () => {
        render(
            <SelectBox
                value=""
                options={options}
                placeholder="Please Select"
                handleChangeValue={mockHandleChangeValue}
            />
        );

        expect(screen.getByText("Please Select")).toBeInTheDocument();
    });

    it("opens the dropdown when clicked", async () => {
        render(
            <SelectBox
                value=""
                options={options}
                placeholder="Please Select"
                handleChangeValue={mockHandleChangeValue}
            />
        );

        const selectElement = screen.getByRole("combobox"); // Use 'combobox' instead of 'button'
        fireEvent.mouseDown(selectElement);

        expect(await screen.findByText("Option 1")).toBeInTheDocument();
        expect(await screen.findByText("Option 2")).toBeInTheDocument();
    });


    it("displays error message when error is passed", () => {
        render(
            <SelectBox
                value=""
                options={options}
                error
                helperText="This field is required"
                handleChangeValue={mockHandleChangeValue}
            />
        );

        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
});
