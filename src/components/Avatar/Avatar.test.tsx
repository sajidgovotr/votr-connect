import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Avatar from "./Avatar";

describe("Avatar Component", () => {
    it("should render without crashing", () => {
        render(<Avatar url="https://example.com/avatar.png" width={50} height={50} />);
        const avatarElement = screen.getByRole("img");
        expect(avatarElement).toBeInTheDocument();
    });

    it("should have the correct src attribute", () => {
        const testUrl = "https://example.com/avatar.png";
        render(<Avatar url={testUrl} width={50} height={50} />);
        const avatarElement = screen.getByRole("img");
        expect(avatarElement).toHaveAttribute("src", testUrl);
    });

    it("should have the correct dimensions", () => {
        render(<Avatar url="https://example.com/avatar.png" width={50} height={50} />);
        const avatarElement = screen.getByTestId("avatar");
        expect(avatarElement).toHaveStyle({ width: "50px", height: "50px" });
    });

});