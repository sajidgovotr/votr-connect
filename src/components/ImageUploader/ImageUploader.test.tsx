import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import FileUploader from "./ImageUploader";

const mockFile = new File(["test"], "test-image.png", { type: "image/png" });

global.URL.createObjectURL = vi.fn(() => "mock-url");

describe("FileUploader Component", () => {
    it("should render the placeholder text", () => {
        render(<FileUploader file={null} onChange={vi.fn()} />);
        expect(screen.getByText(/Drag & drop files or/i)).toBeInTheDocument();
    });

    it("should display the remove button when a file is uploaded", () => {
        render(<FileUploader file={mockFile} onChange={vi.fn()} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should call onChange with null when remove button is clicked", () => {
        const mockOnChange = vi.fn();
        render(<FileUploader file={mockFile} onChange={mockOnChange} />);

        const removeButton = screen.getByRole("button");
        fireEvent.click(removeButton);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    it("should not call onChange if no file is selected", () => {
        const mockOnChange = vi.fn();
        render(<FileUploader file={null} onChange={mockOnChange} />);

        const input = screen.getByTestId("file-input");
        fireEvent.change(input, { target: { files: [] } });

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("should respect max file size limit", () => {
        const mockOnChange = vi.fn();
        const oversizedFile = new File(["a".repeat(3 * 1024 * 1024)], "large-file.png", { type: "image/png" });

        render(<FileUploader file={null} onChange={mockOnChange} maxSize={2 * 1024 * 1024} />);

        const input = screen.getByTestId("file-input");
        Object.defineProperty(input, "files", { value: [oversizedFile] });
        fireEvent.change(input);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("should display info preview text when infoPrev is true", () => {
        render(<FileUploader file={null} onChange={vi.fn()} infoPrev={true} />);

        expect(screen.getByText(/Offer \/ Promotion \/ Early Access Preview/i)).toBeInTheDocument();
    });
});
