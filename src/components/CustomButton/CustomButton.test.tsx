import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CustomButton from "./CustomButton";
import { Save } from "@mui/icons-material";

describe("CustomButton Component", () => {
    it("should render the button with title", () => {
        render(<CustomButton title="Click Me" />);
        expect(screen.getByRole("button", { name: "Click Me" })).toBeInTheDocument();
    });

    it("should render the button with an icon", () => {
        render(<CustomButton icon={<Save data-testid="icon" />} />);
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("should apply outlined variant styles", () => {
        render(<CustomButton title="Click Me" variant="outlined" />);
        const button = screen.getByRole("button", { name: "Click Me" });
        expect(button).toHaveStyle("border: 1px solid #E6E6E9");
    });

    it("should call onClick when clicked", async () => {
        const onClick = vi.fn();
        render(<CustomButton title="Click Me" onClick={onClick} />);
        const button = screen.getByRole("button", { name: "Click Me" });
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should be disabled when disabled prop is set", () => {
        render(<CustomButton title="Click Me" disabled />);
        const button = screen.getByRole("button", { name: "Click Me" });
        expect(button).toBeDisabled();
    });
});
