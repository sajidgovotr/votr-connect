import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import EmptyState from "./EmptyState";

vi.mock("@/assets/images/add-calendar.png", () => ({
    default: "image-url",
}));

describe("EmptyState Component", () => {
    it("should render title and subtitle correctly", () => {
        render(<EmptyState title="No Data" subtitle="Please add items." />);

        expect(screen.getByText("No Data")).toBeInTheDocument();
        expect(screen.getByText("Please add items.")).toBeInTheDocument();
    });

    it("should display the image", () => {
        render(<EmptyState title="No Data" subtitle="Please add items." />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "image-url");
    });

    it("should render button when buttonText is provided", () => {
        render(<EmptyState title="No Data" subtitle="Please add items." buttonText="Add Item" />);

        expect(screen.getByText("Add Item")).toBeInTheDocument();
    });

    it("should call buttonHandler when button is clicked", () => {
        const mockHandler = vi.fn();

        render(<EmptyState title="No Data" subtitle="Please add items." buttonText="Add Item" buttonHandler={mockHandler} />);

        const button = screen.getByText("Add Item");
        fireEvent.click(button);

        expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});
