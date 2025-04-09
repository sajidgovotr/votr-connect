import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import StatusChip from "./StatusChip";

import type { IStatus } from "@/types/global";

describe("StatusChip Component", () => {
    const statuses: IStatus[] = ["failed", "successful", "pending"];

    statuses.forEach((status) => {
        it(`renders correctly for status: ${status}`, () => {
            render(<StatusChip status={status} label="test" />);

            const chipElement = screen.getByText("test");
            expect(chipElement).toBeDefined();
        });
    });
});
