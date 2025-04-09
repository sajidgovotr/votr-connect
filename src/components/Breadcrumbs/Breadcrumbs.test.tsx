import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, vi, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Breadcrumbs from "./Breadcrumb";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Breadcrumbs Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    const breadcrumbData = [
        { name: "Campaign", active: false, url: "/campaign" },
        { name: "Tesla x RoboTaxi Early Access", active: true, url: "" },
    ];

    it("should render without crashing", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs data={breadcrumbData} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText("breadcrumb")).toBeInTheDocument();
    });

    it("should display breadcrumb items correctly", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs data={breadcrumbData} />
            </MemoryRouter>
        );

        expect(screen.getByText("Campaign")).toBeInTheDocument();
        expect(screen.getByText("Tesla x RoboTaxi Early Access")).toBeInTheDocument();
    });

    it("should navigate when clicking a non-active breadcrumb", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs data={breadcrumbData} />
            </MemoryRouter>
        );

        const campaignBreadcrumb = screen.getByText("Campaign");
        fireEvent.click(campaignBreadcrumb);

        expect(mockNavigate).toHaveBeenCalledWith("/campaign");
    });

    it("should not navigate when clicking an active breadcrumb", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs data={breadcrumbData} />
            </MemoryRouter>
        );

        const activeBreadcrumb = screen.getByText("Tesla x RoboTaxi Early Access");
        fireEvent.click(activeBreadcrumb);

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
