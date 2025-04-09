import React, { useState, ReactNode } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
    restrictToVerticalAxis,
    restrictToParentElement
} from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";

interface DraggableListProps {
    children: ReactNode[];
    onDragEnd: (sortedChildren: ReactNode[]) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
    children,
    onDragEnd
}) => {
    const [items, setItems] = useState<ReactNode[]>(children);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(
                    (item) => (item as any).key === active.id
                );
                const newIndex = items.findIndex(
                    (item) => (item as any).key === over.id
                );
                const newItems = arrayMove(items, oldIndex, newIndex);
                onDragEnd(newItems);
                return newItems;
            });
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={items.map((item) => ({ id: (item as any).key }))}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={(item as any).key} id={(item as any).key}>
                        {item}
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default DraggableList;
