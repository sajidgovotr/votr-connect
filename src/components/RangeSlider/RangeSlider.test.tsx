import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import RangeSlider from "./RangeSlider";


describe("RangeSlider Component", () => {
    it("should render the RangeSlider component", () => {
        render(<RangeSlider value={[100, 500]} onChange={vi.fn()} dataTestId="range-slider" />);
        expect(screen.getByTestId("range-slider")).toBeInTheDocument();
    });
});
