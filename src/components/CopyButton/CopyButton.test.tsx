import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import CopyButton from "./CopyButton";
import userEvent from "@testing-library/user-event";

describe("CopyButton Component", () => {
    it("should render the CopyButton component", () => {
        render(<CopyButton />);
        expect(screen.getByTestId("copy-button")).toBeInTheDocument();
    });

    it("should show tooltip on hover", async () => {
        render(<CopyButton />);
        const button = screen.getByTestId("copy-button");

        await userEvent.hover(button);

        expect(await screen.findByText("Copy")).toBeInTheDocument();
    });
});
