import type { ReactNode } from "react";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Input from "./Input";

type ControlledInputProps = {
  label: string;
  variant?: "text" | "cardNumber" | "expiry" | "cvv";
  trailingIcon?: ReactNode;
};

const ControlledInput = ({ label, variant, trailingIcon }: ControlledInputProps) => {
  const [value, setValue] = useState("");

  return (
    <Input
      label={label}
      variant={variant}
      value={value}
      onChange={setValue}
      trailingIcon={trailingIcon}
    />
  );
};

describe("Input", () => {
  it("renders a labeled text input", () => {
    render(<Input label="Cardholder Name" />);

    expect(screen.getByLabelText("Cardholder Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cardholder Name")).toBeInTheDocument();
  });

  it("formats card number input in groups of four digits", async () => {
    const user = userEvent.setup();
    render(<ControlledInput label="Card Number" variant="cardNumber" />);

    const input = screen.getByLabelText("Card Number");
    await user.type(input, "4111111111111111");

    expect(input).toHaveValue("4111 1111 1111 1111");
  });

  it("removes non-digits and limits card number length", async () => {
    const handleChange = vi.fn();
    render(<Input label="Card Number" variant="cardNumber" onChange={handleChange} />);

    await userEvent.type(screen.getByLabelText("Card Number"), "4111abcd1111222233334444");

    expect(handleChange).toHaveBeenLastCalledWith("4111 1111 2222 3333");
  });

  it("formats expiry date as month and year", async () => {
    const user = userEvent.setup();
    render(<ControlledInput label="Expiry Date" variant="expiry" />);

    const input = screen.getByLabelText("Expiry Date");
    await user.type(input, "1228");

    expect(input).toHaveValue("12 / 28");
  });

  it("keeps expiry numeric and limited to two month digits and two year digits", async () => {
    const user = userEvent.setup();
    render(<ControlledInput label="Expiry Date" variant="expiry" />);

    const input = screen.getByLabelText("Expiry Date");
    await user.type(input, "1a2b2899");

    expect(input).toHaveValue("12 / 28");
  });

  it("formats expiry even when used without controlled value", async () => {
    const user = userEvent.setup();
    render(<Input label="Expiry Date" variant="expiry" />);

    const input = screen.getByLabelText("Expiry Date");
    await user.type(input, "1a2b2899");

    expect(input).toHaveValue("12 / 28");
  });

  it("keeps CVV numeric and limited to three digits", async () => {
    const user = userEvent.setup();
    render(<ControlledInput label="CVV" variant="cvv" />);

    const input = screen.getByLabelText("CVV");
    await user.type(input, "12a345");

    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue("123");
  });

  it("limits CVV even when used without controlled value", async () => {
    const user = userEvent.setup();
    render(<Input label="CVV" variant="cvv" />);

    const input = screen.getByLabelText("CVV");
    await user.type(input, "12a345");

    expect(input).toHaveValue("123");
  });

  it("renders a trailing icon when provided", () => {
    render(
      <Input
        label="CVV"
        variant="cvv"
        trailingIcon={<span data-testid="cvv-icon" />}
      />,
    );

    expect(screen.getByTestId("cvv-icon")).toBeInTheDocument();
  });
});
