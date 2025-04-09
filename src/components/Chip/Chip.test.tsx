import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Chip from "./Chip";

describe("Chip Component", () => {
    it("should render the Chip component", () => {
        render(<Chip name="Technology" />);
        expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
        const { container } = render(<Chip name="Finance" className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render text with correct font weight and size", () => {
        render(<Chip name="Marketing" />);
        const textElement = screen.getByText("Marketing");
        expect(textElement).toHaveStyle("font-weight: 500");
        expect(textElement).toHaveStyle("font-size: 14px");
    });
});
