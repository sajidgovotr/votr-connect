import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
import Card from "./Card";

describe("Card Component", () => {
    it("should render children correctly", () => {
        render(
            <Card>
                <p>Test Card Content</p>
            </Card>
        );

        expect(screen.getByText("Test Card Content")).toBeInTheDocument();
    });

    it("should apply custom class names", () => {
        const { container } = render(<Card className="custom-class">Content</Card>);
        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should trigger onClick when clicked", () => {
        const mockOnClick = vi.fn();
        render(<Card onClick={mockOnClick}>Clickable Card</Card>);

        fireEvent.click(screen.getByText("Clickable Card"));
        expect(mockOnClick).toHaveBeenCalled();
    });
});
