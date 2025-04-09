import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router";

const mockStore = configureStore([]);
const initialState = {
    auth: { user: { role: "TA" } },
};

describe("Navbar Component", () => {
    it("should render the Navbar component", () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar isSidebarExtended={false} onSidebarExtend={vi.fn()} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/events"]}>
                    <Navbar isSidebarExtended={false} onSidebarExtend={vi.fn()} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Event Management")).toBeInTheDocument();
    });


    it("should render notification and help icons", () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar isSidebarExtended={false} onSidebarExtend={vi.fn()} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByTestId("notification-icon")).toBeInTheDocument();
        expect(screen.getByTestId("help-icon")).toBeInTheDocument();
    });
});
