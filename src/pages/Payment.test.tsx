import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import {
  SELECTED_PLAN_STORAGE_KEY,
  type SubscribePlan,
} from "@/context/subscription";
import Payment from "./Payment";

const mockPlan: SubscribePlan = {
  id: "4",
  period: "12 Months",
  price: 4700,
  fullprice: 8400,
  addition: "Plus 5 free back issues",
  type: "Popular Pack",
};

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="current-path">{location.pathname}</div>;
};

const renderPayment = (plan: SubscribePlan | null = mockPlan) => {
  localStorage.clear();

  if (plan) {
    localStorage.setItem(SELECTED_PLAN_STORAGE_KEY, JSON.stringify(plan));
  }

  return render(
    <MemoryRouter initialEntries={["/payment"]}>
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<LocationDisplay />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </SubscriptionProvider>
    </MemoryRouter>,
  );
};

afterEach(() => {
  localStorage.clear();
});

describe("Payment", () => {
  // Verifies the payment page renders the main checkout sections after a plan has been selected.
  it("renders the selected plan, order summary, payment methods, and card form", () => {
    renderPayment();

    expect(
      screen.getByText(/payment information/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/select plan/i)).toBeInTheDocument();
    expect(screen.getByText(/^payment$/i)).toBeInTheDocument();
    expect(screen.getByText(/account & receipt/i)).toBeInTheDocument();

    expect(screen.getByText(/order item/i)).toBeInTheDocument();
    expect(screen.getByText(/epaper 12 months/i)).toBeInTheDocument();
    expect(screen.getAllByText(/4,700 baht/i)).not.toHaveLength(0);
    expect(screen.getByRole("link", { name: /change plans/i })).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByPlaceholderText(/use redeem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
    expect(screen.queryByText(/discount:/i)).not.toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();

    expect(screen.getByText(/payment method/i)).toBeInTheDocument();
    expect(
      screen.getByText(/after payment, you will be redirected/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /credit card/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /qr code/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/cardholder name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm payment/i }),
    ).toBeInTheDocument();
  });

  // Verifies the mock promotion code applies a 10% discount and updates the total price.
  it("applies a 10 percent mock discount when the redeem code is used", async () => {
    const user = userEvent.setup();
    renderPayment();

    await user.type(screen.getByPlaceholderText(/use redeem/i), "redeem");
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(screen.getByText(/discount:/i)).toBeInTheDocument();
    expect(screen.getByText(/- 470 baht/i)).toBeInTheDocument();
    expect(screen.getByText(/4,230 baht/i)).toBeInTheDocument();
  });

  // Verifies editing the promotion code resets the applied discount until users apply it again.
  it("hides the discount line when the redeem code changes after being applied", async () => {
    const user = userEvent.setup();
    renderPayment();

    const redeemInput = screen.getByPlaceholderText(/use redeem/i);
    await user.type(redeemInput, "redeem");
    await user.click(screen.getByRole("button", { name: /apply/i }));
    expect(screen.getByText(/discount:/i)).toBeInTheDocument();

    await user.type(redeemInput, "x");

    expect(screen.queryByText(/discount:/i)).not.toBeInTheDocument();
  });

  // Verifies card checkout blocks confirmation when required card fields are missing.
  it("shows a validation message when card payment details are incomplete", async () => {
    const user = userEvent.setup();
    renderPayment();

    await user.click(screen.getByRole("button", { name: /confirm payment/i }));

    expect(
      screen.getByText(/please complete payment information before continuing/i),
    ).toBeInTheDocument();
  });

  // Verifies completing all card fields clears the payment validation error.
  it("clears the validation message after users complete the card form", async () => {
    const user = userEvent.setup();
    renderPayment();

    await user.click(screen.getByRole("button", { name: /confirm payment/i }));
    expect(
      screen.getByText(/please complete payment information before continuing/i),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/cardholder name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/card number/i), "4111111111111111");
    await user.type(screen.getByLabelText(/expiry date/i), "1228");
    await user.type(screen.getByLabelText(/cvv/i), "123");
    await user.click(screen.getByRole("button", { name: /confirm payment/i }));

    expect(
      screen.queryByText(/please complete payment information before continuing/i),
    ).not.toBeInTheDocument();
  });

  // Verifies QR checkout swaps the card form for a mock QR code and does not require card fields.
  it("shows a mock QR code and hides card inputs when QR Code is selected", async () => {
    const user = userEvent.setup();
    renderPayment();

    await user.click(screen.getByRole("button", { name: /qr code/i }));

    expect(screen.getByLabelText(/mock qr code/i)).toBeInTheDocument();
    expect(screen.getByText(/this is mock qr code/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/cardholder name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /confirm payment/i }));
    expect(
      screen.queryByText(/please complete payment information before continuing/i),
    ).not.toBeInTheDocument();
  });

  // Verifies direct visits to Payment without a selected plan are redirected back to Home.
  it("redirects to Home when no subscription plan is selected", () => {
    renderPayment(null);

    expect(screen.getByTestId("current-path")).toHaveTextContent("/");
  });
});
