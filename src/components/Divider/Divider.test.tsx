import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Divider from "./Divider";

describe("Divider Component", () => {
    it("should render the Divider component", () => {
        render(<Divider />);
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("should apply additional className if provided", () => {
        render(<Divider className="custom-class" />);
        const divider = screen.getByRole("separator");
        expect(divider).toHaveClass("custom-class");
    });

    it("should have default classes applied", () => {
        render(<Divider />);
        const divider = screen.getByRole("separator");
        expect(divider).toHaveClass("border-t border-cardBorder !my-2 !mb-2");
    });
});
