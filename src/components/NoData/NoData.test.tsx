import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import NoData from "./NoData";

describe("NoData Component", () => {
    it("should render the NoData component", () => {
        render(<NoData />);

        expect(screen.getByAltText("no-data")).toBeInTheDocument();
        expect(screen.getByText("No Data Found")).toBeInTheDocument();
    });

    it("should display the correct image and text", () => {
        render(<NoData />);


        expect(screen.getByText("No Data Found")).toBeInTheDocument();
    });
});