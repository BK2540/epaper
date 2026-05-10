import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import {
  SELECTED_PLAN_STORAGE_KEY,
  type SubscribePlan,
} from "@/context/subscription";
import Receipt, { type ReceiptDetails } from "./Receipt";

const mockPlan: SubscribePlan = {
  id: "4",
  period: "12 Months",
  price: 4700,
  fullprice: 8400,
  addition: "Plus 5 free back issues",
  type: "Popular Pack",
};

const mockReceipt: ReceiptDetails = {
  plan: mockPlan,
  paymentMethod: "qr",
  discount: 470,
  total: 4230,
  orderNumber: "EP-12345678",
  paidAt: "2026-05-10T13:30:00.000Z",
};

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="current-path">{location.pathname}</div>;
};

const renderReceipt = ({
  plan = mockPlan,
  receipt = mockReceipt,
}: {
  plan?: SubscribePlan | null;
  receipt?: ReceiptDetails | null;
} = {}) => {
  localStorage.clear();

  if (plan) {
    localStorage.setItem(SELECTED_PLAN_STORAGE_KEY, JSON.stringify(plan));
  }

  return render(
    <MemoryRouter
      initialEntries={[
        receipt ? { pathname: "/receipt", state: { receipt } } : "/receipt",
      ]}
    >
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<LocationDisplay />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </SubscriptionProvider>
    </MemoryRouter>,
  );
};

afterEach(() => {
  localStorage.clear();
});

describe("Receipt", () => {
  it("renders receipt details from navigation state", () => {
    renderReceipt();

    expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
    expect(screen.getByText("EP-12345678")).toBeInTheDocument();
    expect(screen.getByText(/epaper 12 months/i)).toBeInTheDocument();
    expect(screen.getByText(/qr code/i)).toBeInTheDocument();
    expect(screen.getByText(/2026/i)).toBeInTheDocument();
    expect(screen.getByText(/- 470 baht/i)).toBeInTheDocument();
    expect(screen.getByText(/4,230 baht/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/account & receipt/i)[0].closest("li"),
    ).toHaveAttribute("aria-current", "step");
    expect(screen.getByText(/^payment$/i).closest("li")).not.toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("falls back to the selected plan when users refresh the receipt page", () => {
    renderReceipt({ receipt: null });

    expect(screen.getByText("EP-PENDING")).toBeInTheDocument();
    expect(screen.getByText(/epaper 12 months/i)).toBeInTheDocument();
    expect(screen.getByText(/credit card/i)).toBeInTheDocument();
    expect(screen.queryByText(/discount/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/4,700 baht/i)).not.toHaveLength(0);
  });

  it("redirects to Home when there is no selected plan", () => {
    renderReceipt({ plan: null, receipt: null });

    expect(screen.getByTestId("current-path")).toHaveTextContent("/");
  });

  it("navigates back to Home from the receipt", async () => {
    const user = userEvent.setup();
    renderReceipt();

    await user.click(screen.getByRole("button", { name: /back to home/i }));

    expect(screen.getByTestId("current-path")).toHaveTextContent("/");
  });
});
