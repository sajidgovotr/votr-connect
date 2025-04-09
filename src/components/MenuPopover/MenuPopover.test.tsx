import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import MenuPopover from "./MenuPopover";

describe("MenuPopover Component", () => {
    it("should render the button with an avatar", () => {
        render(<MenuPopover avatar="A">Popover Content</MenuPopover>);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument(); // Avatar content
    });

    it("should display the initial letter of text if avatar is not provided", () => {
        render(<MenuPopover text="John">Popover Content</MenuPopover>);

        expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should open popover when button is clicked", async () => {
        render(<MenuPopover text="User">Popover Content</MenuPopover>);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("Popover Content")).toBeVisible();
        });
    });

    it("should apply custom button and popover class names", async () => {
        render(
            <MenuPopover text="User" buttonClassName="custom-button" popoverClassName="custom-popover">
                Popover Content
            </MenuPopover>
        );

        expect(screen.getByRole("button")).toHaveClass("custom-button");

        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Popover Content").parentElement).toHaveClass("custom-popover");
        });
    });
});
