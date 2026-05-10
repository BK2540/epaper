import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Header from "./Header";

const LocationDisplay = () => {
  const location = useLocation();

  return (
    <div data-testid="current-location">
      {location.pathname}
      {location.hash}
    </div>
  );
};

const renderHeader = (initialEntry = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Header />
      <Routes>
        <Route path="/" element={<LocationDisplay />} />
        <Route path="/payment" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  );
};

afterEach(() => {
  document.body.style.overflow = "";
  vi.restoreAllMocks();
});

describe("Header", () => {
  // Verifies the header exposes the main desktop navigation links users need on every page.
  it("renders the logo and primary navigation links", () => {
    renderHeader();

    expect(
      screen.getByRole("link", { name: /bangkok post home/i }),
    ).toBeInTheDocument();

    const primaryNavigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    expect(
      within(primaryNavigation).getByRole("link", { name: /our product/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNavigation).getByRole("link", {
        name: /how to subscribe/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(primaryNavigation).getByRole("link", { name: /read epaper/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNavigation).getByRole("link", { name: /faq/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNavigation).getByRole("link", { name: /account/i }),
    ).toBeInTheDocument();
  });

  // Verifies section links work from another route by navigating back to Home with the right hash.
  it("navigates section links to the Home page hash from Payment", async () => {
    const user = userEvent.setup();
    renderHeader("/payment");

    const primaryNavigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    await user.click(
      within(primaryNavigation).getByRole("link", {
        name: /how to subscribe/i,
      }),
    );

    expect(screen.getByTestId("current-location")).toHaveTextContent(
      "/#subscribe",
    );
  });

  // Verifies the logo always takes users back to the Home route.
  it("navigates home when the logo is clicked", async () => {
    const user = userEvent.setup();
    renderHeader("/payment");

    await user.click(screen.getByRole("link", { name: /bangkok post home/i }));

    expect(screen.getByTestId("current-location")).toHaveTextContent("/");
  });

  // Verifies opening the mobile menu shows mobile-only actions and locks body scrolling.
  it("opens the mobile menu and locks page scrolling", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(
      screen.getByRole("navigation", { name: /mobile navigation/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  // Verifies mobile navigation closes after users choose a destination.
  it("closes the mobile menu after a mobile navigation link is clicked", async () => {
    const user = userEvent.setup();
    renderHeader("/payment");

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile navigation/i,
    });

    await user.click(
      within(mobileNavigation).getByRole("link", { name: /read now/i }),
    );

    expect(
      screen.queryByRole("navigation", { name: /mobile navigation/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("current-location")).toHaveTextContent(
      "/#epaper",
    );
  });
});
