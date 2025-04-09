import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppContainer from "./AppContainer";

// Mock necessary components
vi.mock("@/pages", () => ({
    Splash: () => <div data-testid="splash-screen">Splash Screen</div>,
}));

vi.mock("@/routes", () => ({
    default: () => <div data-testid="routes">Routes Component</div>,
}));

describe("AppContainer Component", () => {
    it("should render the splash screen initially", () => {
        render(<AppContainer />);
        expect(screen.getByTestId("splash-screen")).toBeDefined();
    });

    it("should render the Routes component after the loading period", async () => {
        render(<AppContainer />);

        await waitFor(() => {
            expect(screen.getByTestId("routes")).toBeDefined();
        }, { timeout: 2500 });
    });
});
