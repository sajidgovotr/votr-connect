import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Logo from "./Logo";

vi.mock("@/assets/images/logo.png", () => ({ default: "logo-url" }));
vi.mock("@/assets/images/logo-full.png", () => ({ default: "logo-full-url" }));

vi.mock("../../hooks/useBreakPoint", () => ({
    default: vi.fn(() => true),
}));

describe("Logo Component", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should render the default logo when 'full' is false", () => {
        render(<Logo />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "logo-url");
        expect(image).toHaveAttribute("width", "36");
        expect(image).toHaveAttribute("height", "36");
    });

    it("should render the full logo when 'full' is true and 'md' breakpoint is active", () => {
        render(<Logo full />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "logo-full-url");
        expect(image).toHaveAttribute("width", "160");
    });

    it("should render the logo with custom size", () => {
        render(<Logo size={50} />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("width", "50");
        expect(image).toHaveAttribute("height", "50");
    });
});
