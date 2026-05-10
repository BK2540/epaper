import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSubscription, type SubscribePlan } from "@/context/subscription";
import { CheckCircle2 } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import PaymentStepIndicator from "@/components/PaymentStepIndicator";

export type ReceiptPaymentMethod = "card" | "qr";

export type ReceiptDetails = {
  plan: SubscribePlan;
  paymentMethod: ReceiptPaymentMethod;
  discount: number;
  total: number;
  orderNumber: string;
  paidAt: string;
};

const formatBaht = (value: number) => `${value.toLocaleString()} Baht`;

const formatPaymentMethod = (paymentMethod: ReceiptPaymentMethod) => {
  return paymentMethod === "card" ? "Credit Card" : "QR Code";
};

const formatPaidAt = (paidAt: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(paidAt));
};

const Receipt = () => {
  const { selectedPlan } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const receipt = (location.state as { receipt?: ReceiptDetails } | null)
    ?.receipt;

  if (!selectedPlan) {
    return <Navigate to="/" replace />;
  }

  const receiptDetails: ReceiptDetails = receipt ?? {
    plan: selectedPlan,
    paymentMethod: "card",
    discount: 0,
    total: selectedPlan.price,
    orderNumber: "EP-PENDING",
    paidAt: new Date().toISOString(),
  };

  return (
    <section className="w-full h-full bg-surface-cream p-10 xl:px-[140px] xl:py-[96px]">
      <div className="mx-auto w-full bg-surface-white px-6 py-10 sm:px-[100px] lg:max-w-[720px] xl:px-[118px] xl:pt-[48px] xl:pb-[80px]">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2
            aria-hidden="true"
            className="h-12 w-12 text-blue-600"
            strokeWidth={1.8}
          />
          <p className="mt-5 font-serif-text text-[32px] leading-9 font-normal text-black">
            Payment Successful
          </p>

          <p className="mt-3 max-w-[420px] font-sans text-[15px] leading-6 text-neutral-700">
            Your account is ready and your receipt has been created.
          </p>
        </div>

        <PaymentStepIndicator currentStep="account-receipt" />

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <p className="font-serif-display text-[18px] leading-5 text-black">
              Account & Receipt
            </p>
            <p className="font-sans text-[13px] leading-5 text-neutral-700">
              {receiptDetails.orderNumber}
            </p>
          </div>
          <div className="mt-3 h-px w-full bg-black" />

          <dl className="mt-6 grid gap-4 font-sans text-[13px] leading-5">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-700">Plan</dt>
              <dd className="text-right text-black">
                Epaper {receiptDetails.plan.period}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-700">Payment method</dt>
              <dd className="text-right text-black">
                {formatPaymentMethod(receiptDetails.paymentMethod)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-700">Paid at</dt>
              <dd className="text-right text-black">
                {formatPaidAt(receiptDetails.paidAt)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 h-px w-full bg-neutral-350" />

          <dl className="mt-6 grid gap-3 font-sans text-[13px] leading-5">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-700">Price</dt>
              <dd className="text-right text-black">
                {formatBaht(receiptDetails.plan.price)}
              </dd>
            </div>
            {receiptDetails.discount > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-700">Discount</dt>
                <dd className="text-right text-danger">
                  - {formatBaht(receiptDetails.discount)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4 font-serif-display text-[18px] leading-5">
              <dt className="text-black">Total paid</dt>
              <dd className="text-right text-black">
                {formatBaht(receiptDetails.total)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <CustomButton title="Back to Home" onClick={() => navigate("/")} />
        </div>
      </div>
    </section>
  );
};

export default Receipt;
