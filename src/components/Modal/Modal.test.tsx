import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Modal from "./index";

describe("Modal Component", () => {
    it("should not be visible when `open` is false", () => {
        render(
            <Modal open={false} onClose={() => { }}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });

    it("should be visible when `open` is true", () => {
        render(
            <Modal open={true} onClose={() => { }}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.getByTestId("modal")).toBeVisible();
    });

    it("should apply the provided `className`", () => {
        render(
            <Modal open={true} onClose={() => { }} className="custom-modal">
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.getByTestId("modal")).toHaveClass("custom-modal");
    });
});
