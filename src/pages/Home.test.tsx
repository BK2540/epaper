import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import Home from "./Home";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const renderHome = () => {
  return render(
    <MemoryRouter>
      <SubscriptionProvider>
        <Home />
      </SubscriptionProvider>
    </MemoryRouter>,
  );
};

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="current-path">{location.pathname}</div>;
};

const renderHomeWithRoutes = () => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <SubscriptionProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/payment" element={<LocationDisplay />} />
        </Routes>
      </SubscriptionProvider>
    </MemoryRouter>,
  );
};

describe("Home", () => {
  // Verifies the Home page composes every major landing-page section.
  it("renders all main home sections", () => {
    const { container } = renderHome();

    expect(container.querySelector("#our-products")).toBeInTheDocument();
    expect(container.querySelector("#subscribe")).toBeInTheDocument();
    expect(container.querySelector("#epaper")).toBeInTheDocument();
    expect(container.querySelector("#faq")).toBeInTheDocument();
    expect(container.querySelector("#format")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /there's a better way to experience the bangkok post epaper/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /faq/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /print subscription/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /digital subscription/i }),
    ).toBeInTheDocument();
  });

  // Verifies the subscribe cards behave as selectable and clearable radio plans.
  it("lets users select and unselect a subscription plan", async () => {
    const user = userEvent.setup();
    renderHome();

    const yearlyPlan = screen
      .getByText("4,700 Baht")
      .closest("label")
      ?.querySelector<HTMLInputElement>('input[type="radio"]');

    if (!yearlyPlan) {
      throw new Error("Expected the 12 Months subscription radio to render.");
    }

    expect(yearlyPlan).not.toBeChecked();

    await user.click(yearlyPlan);
    expect(yearlyPlan).toBeChecked();

    await user.click(yearlyPlan);
    expect(yearlyPlan).not.toBeChecked();
  });

  // Verifies Subscribe now blocks payment navigation until a plan is selected.
  it("shows a plan selection error and keeps users on Home when no plan is selected", async () => {
    const user = userEvent.setup();
    renderHomeWithRoutes();

    const subscribeButton = screen.getByRole("button", {
      name: /subscribe now/i,
    });

    await user.click(subscribeButton);

    expect(
      screen.getByText(/no plan selected\. please choose one to continue\./i),
    ).toBeInTheDocument();
    expect(subscribeButton).toHaveClass("bg-black", "text-white");
    expect(screen.getByTestId("current-path")).toHaveTextContent("/");
  });

  // Verifies the Read Epaper carousel controls update the displayed feature.
  it("changes the epaper feature when a carousel dot is clicked", async () => {
    const user = userEvent.setup();
    renderHome();

    expect(
      screen.getAllByText(/familiar newspaper layout/i)[0],
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /show epaper feature 2/i }),
    );

    expect(
      screen.getAllByText(/read anytime, anywhere on any device/i)[0],
    ).toBeInTheDocument();
  });

  // Verifies FAQ accordion topics can collapse the open answer and open another answer.
  it("opens and closes FAQ answers", async () => {
    const user = userEvent.setup();
    renderHome();

    const firstQuestion = screen.getByRole("button", {
      name: /what is the difference between reading the bangkok post newspaper/i,
    });
    const secondQuestion = screen.getByRole("button", {
      name: /do you offer a free trial/i,
    });

    expect(screen.getByText("Epaper")).toBeInTheDocument();

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

    await user.click(secondQuestion);
    expect(
      screen.getByText(/yes\. you can request a free 3-day trial/i),
    ).toBeInTheDocument();
  });

  // Verifies the promotion carousel dots and format subscription links are present.
  it("renders promotion carousel controls and format card actions", () => {
    renderHome();

    expect(
      screen.getByRole("button", { name: /show promotion 1/i }),
    ).toHaveAttribute("aria-current", "true");

    const formatSection = screen
      .getByRole("heading", {
        name: /choose the format you prefer/i,
      })
      .closest("section");

    expect(formatSection).toBeInTheDocument();
    expect(
      within(formatSection as HTMLElement).getAllByRole("link", {
        name: /subscribe/i,
      }),
    ).toHaveLength(2);
    expect(
      within(formatSection as HTMLElement).getByRole("link", {
        name: /whare to find us/i,
      }),
    ).toBeInTheDocument();
  });
});
