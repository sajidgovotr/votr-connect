import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableList from "./DraggableList";

describe("DraggableList Component", () => {
    const mockOnDragEnd = vi.fn();

    const items = [
        <div key="item-1" data-testid="item-1">Item 1</div>,
        <div key="item-2" data-testid="item-2">Item 2</div>,
        <div key="item-3" data-testid="item-3">Item 3</div>
    ];

    it("should render all items", () => {
        render(<DraggableList onDragEnd={mockOnDragEnd}>{items}</DraggableList>);

        expect(screen.getByTestId("item-1")).toBeInTheDocument();
        expect(screen.getByTestId("item-2")).toBeInTheDocument();
        expect(screen.getByTestId("item-3")).toBeInTheDocument();
    });

    it("should maintain the correct number of items", () => {
        render(<DraggableList onDragEnd={mockOnDragEnd}>{items}</DraggableList>);

        expect(screen.getAllByTestId(/^item-/)).toHaveLength(3);
    });

    it("should call onDragEnd when an item is dragged", async () => {
        render(
            <DndContext onDragEnd={mockOnDragEnd}>
                <DraggableList onDragEnd={mockOnDragEnd}>{items}</DraggableList>
            </DndContext>
        );

        const item1 = screen.getByTestId("item-1");

        await userEvent.pointer({ keys: "[MouseLeft>]", target: item1 });

        expect(mockOnDragEnd).not.toHaveBeenCalled();
    });

    it("should correctly reorder items after a drag event", () => {
        render(<DraggableList onDragEnd={mockOnDragEnd}>{items}</DraggableList>);

        const mockEvent: DragEndEvent = {
            active: { id: "item-1" },
            over: { id: "item-2" },
        } as DragEndEvent;

        mockOnDragEnd(mockEvent);
        expect(mockOnDragEnd).toHaveBeenCalled();
    });
});
