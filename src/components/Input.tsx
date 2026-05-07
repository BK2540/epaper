import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type InputVariant = "text" | "cardNumber" | "expiry" | "cvv";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  variant?: InputVariant;
  onChange?: (value: string) => void;
  trailingIcon?: ReactNode;
};

const formatValue = (value: string, variant: InputVariant) => {
  if (variant === "cardNumber") {
    return value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  if (variant === "expiry") {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  }

  if (variant === "cvv") {
    return value.replace(/\D/g, "").slice(0, 3);
  }

  return value;
};

const getInputProps = (variant: InputVariant) => {
  if (variant === "cardNumber") {
    return {
      autoComplete: "cc-number",
      inputMode: "numeric" as const,
      placeholder:
        "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022",
    };
  }

  if (variant === "expiry") {
    return {
      autoComplete: "cc-exp",
      inputMode: "numeric" as const,
      placeholder: "MM / YY",
    };
  }

  if (variant === "cvv") {
    return {
      autoComplete: "cc-csc",
      inputMode: "numeric" as const,
      placeholder: "\u2022\u2022\u2022",
    };
  }

  return {
    autoComplete: "cc-name",
    placeholder: "Cardholder Name",
  };
};

const Input = ({
  label,
  variant = "text",
  className = "",
  onChange,
  trailingIcon,
  ...props
}: InputProps) => {
  const variantProps = getInputProps(variant);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatValue(event.target.value, variant);

    event.target.value = formattedValue;
    onChange?.(formattedValue);
  };

  return (
    <label
      className={`block font-['DM_Sans'] text-[13px] leading-5 text-black ${className}`}
    >
      <span className="mb-3 block">{label}</span>
      <span className="relative block">
        <input
          {...variantProps}
          {...props}
          onChange={handleChange}
          className="h-14 w-full rounded-[3px] border border-neutral-300 bg-surface-white px-3.75 text-[13px] leading-5 text-black outline-none transition-colors placeholder:text-[#757575] focus:border-neutral-600"
        />
        {trailingIcon && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
            {trailingIcon}
          </span>
        )}
      </span>
    </label>
  );
};

export default Input;
