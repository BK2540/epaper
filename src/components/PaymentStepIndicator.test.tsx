import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaymentStepIndicator from "./PaymentStepIndicator";

const getStepItem = (label: RegExp) => screen.getByText(label).closest("li");

const getStepMarker = (label: RegExp) =>
  getStepItem(label)?.querySelector("span");

describe("PaymentStepIndicator", () => {
  it("marks Payment as the current step during checkout", () => {
    render(<PaymentStepIndicator currentStep="payment" />);

    expect(getStepItem(/select plan/i)).not.toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(getStepMarker(/select plan/i)).toHaveClass("bg-black");

    expect(getStepItem(/^payment$/i)).toHaveAttribute("aria-current", "step");
    expect(getStepMarker(/^payment$/i)).toHaveClass("bg-blue-600");

    expect(getStepItem(/account & receipt/i)).not.toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(getStepMarker(/account & receipt/i)).toHaveClass("bg-blue-600");
  });

  it("marks Payment as completed and Account & Receipt as current after payment", () => {
    render(<PaymentStepIndicator currentStep="account-receipt" />);

    expect(getStepItem(/select plan/i)).not.toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(getStepMarker(/select plan/i)).toHaveClass("bg-black");

    expect(getStepItem(/^payment$/i)).not.toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(getStepMarker(/^payment$/i)).toHaveClass("bg-black");

    expect(getStepItem(/account & receipt/i)).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(getStepMarker(/account & receipt/i)).toHaveClass("bg-blue-600");
  });
});
