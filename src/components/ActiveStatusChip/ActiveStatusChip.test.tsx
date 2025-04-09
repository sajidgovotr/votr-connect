import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ActiveStatusChip from "./ActiveStatusChip";

describe("ActiveStatusChip Component", () => {
    it("should apply the correct color for active status", () => {
        render(<ActiveStatusChip isActive={true} />);
        const chipElement = screen.getByText("Active");
        expect(getComputedStyle(chipElement).color).toBe("rgb(52, 168, 83)");
    });

    it("should apply the correct color for inactive status", () => {
        render(<ActiveStatusChip isActive={false} />);
        const chipElement = screen.getByText("Inactive");
        expect(getComputedStyle(chipElement).color).toBe("rgb(3, 7, 18)");
    });

});
