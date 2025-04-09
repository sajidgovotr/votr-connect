import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { SortableItem } from "./sortable-item";
import { DndContext } from "@dnd-kit/core";

describe("SortableItem Component", () => {
    it("should render the SortableItem component", () => {
        render(
            <DndContext>
                <SortableItem id="test-item">Test Content</SortableItem>
            </DndContext>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should assign the correct id", () => {
        render(
            <DndContext>
                <SortableItem id="sortable-1">Sortable Item</SortableItem>
            </DndContext>
        );
        expect(screen.getByText("Sortable Item")).toBeDefined();
    });

    it("should call setNodeRef", () => {
        render(
            <DndContext>
                <SortableItem id="sortable-1">Test Item</SortableItem>
            </DndContext>
        );

        const item = screen.getByText("Test Item").parentElement;
        expect(item).toBeInTheDocument();
    });

    it("should render children properly", () => {
        render(
            <DndContext>
                <SortableItem id="sortable-1">
                    <span data-testid="child-element">Child Element</span>
                </SortableItem>
            </DndContext>
        );

        expect(screen.getByTestId("child-element")).toBeInTheDocument();
    });
});
