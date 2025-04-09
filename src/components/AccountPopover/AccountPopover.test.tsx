import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AccountPopover from "./AccountPopover";

// Mock necessary modules
vi.mock("./useAccountPopover", () => ({
    default: () => ({
        handlers: {
            handleOpen: vi.fn(),
            handleClose: vi.fn(),
        },
        state: {
            anchorRef: { current: document.createElement("button") },
            open: false,
            user: { name: "John Doe", userRole: "Admin" },
        },
    }),
}));

vi.mock("@/components", () => ({
    Logout: () => <div data-testid="logout-button">Logout</div>,
}));

describe("AccountPopover Component", () => {
    const mockStore = configureStore();
    let store: any;

    beforeEach(() => {
        store = mockStore({
            auth: {
                user: { name: "John Doe", userRole: "Admin" },
            },
        });
    });

    it("should render without crashing", () => {
        render(
            <Provider store={store}>
                <AccountPopover />
            </Provider>
        );

        const accountPopoverElement = screen.getByTestId("account-popover");
        expect(accountPopoverElement).toBeDefined();
    });

    it("should display user name and role in popover when open", () => {
        vi.mock("./useAccountPopover", () => ({
            default: () => ({
                handlers: {
                    handleOpen: vi.fn(),
                    handleClose: vi.fn(),
                },
                state: {
                    anchorRef: { current: document.createElement("button") },
                    open: true,
                    user: { name: "John Doe", userRole: "Admin" },
                },
            }),
        }));

        render(
            <Provider store={store}>
                <AccountPopover />
            </Provider>
        );

        expect(screen.getByText("John Doe")).toBeDefined();
        expect(screen.getByText("Admin")).toBeDefined();
    });

    it("should display the logout button inside the popover", () => {
        render(
            <Provider store={store}>
                <AccountPopover />
            </Provider>
        );

        expect(screen.getByTestId("logout-button")).toBeDefined();
    });
});
