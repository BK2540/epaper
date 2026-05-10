import { Check } from "lucide-react";

export type PaymentStepId = "select-plan" | "payment" | "account-receipt";

const paymentSteps: { id: PaymentStepId; label: string }[] = [
  { id: "select-plan", label: "Select plan" },
  { id: "payment", label: "Payment" },
  { id: "account-receipt", label: "Account & Receipt" },
];

const PaymentStepIndicator = ({
  currentStep,
}: {
  currentStep: PaymentStepId;
}) => {
  const currentStepIndex = paymentSteps.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <ol
      aria-label="Payment progress"
      className="relative mt-8 mb-9 grid w-full grid-cols-3"
    >
      <span
        aria-hidden="true"
        className="absolute left-[11px] right-[11px] top-[11px] h-px bg-blue-600"
      />

      {paymentSteps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const alignment =
          index === 0
            ? "items-start text-left"
            : index === paymentSteps.length - 1
              ? "items-end text-right"
              : "items-center text-center";

        return (
          <li
            key={step.id}
            className={`relative z-10 flex flex-col gap-2 ${alignment}`}
            aria-current={isCurrent ? "step" : undefined}
          >
            <span
              className={`flex h-[22px] w-[22px] items-center justify-center rounded-full ${
                isCompleted ? "bg-black" : "bg-blue-600"
              }`}
            >
              {(isCompleted || isCurrent) && (
                <Check
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-surface-white"
                  strokeWidth={3}
                />
              )}
            </span>
            <span
              className={`font-sans text-[11px] leading-5 text-black wrap-break-word ${step.id === "select-plan" && "-translate-x-3"} ${step.id === "account-receipt" && "md:translate-x-7"}`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default PaymentStepIndicator;
