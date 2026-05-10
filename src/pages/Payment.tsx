import { useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { useSubscription } from "@/context/subscription";
import CustomButton from "@/components/CustomButton";
import PaymentStepIndicator from "@/components/PaymentStepIndicator";
import CreditCardIcon from "@/assets/icon/credit.svg";
import QrCodeIcon from "@/assets/icon/qr.svg";
import type { ReceiptDetails } from "./Receipt";

type PaymentMethod = "card" | "qr";

const SecurityCodeIcon = () => {
  return (
    <span className="block h-[22px] w-8 rounded-[1px] border border-neutral-600 text-[9px] leading-none">
      <span className="block h-1 border-b border-neutral-600 bg-neutral-200" />
      <span className="flex h-[17px] items-end justify-between px-[3px] pb-[3px]">
        <span className="flex flex-col gap-[2px]">
          <span className="h-px w-2.5 bg-neutral-600" />
          <span className="h-px w-2.5 bg-neutral-600" />
          <span className="h-px w-2.5 bg-neutral-600" />
        </span>
        <span className="font-['DM_Sans'] text-[10px] leading-none">∞</span>
      </span>
    </span>
  );
};

const PaymentMethodOption = ({
  icon,
  isSelected,
  label,
  onClick,
}: {
  icon: string;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[70px] w-[117px] flex-col items-start justify-center gap-1 rounded-[3px] border px-4 text-left font-sans text-[13px] leading-6 font-normal transition-colors ${
        isSelected
          ? "border-2 border-[#527DFA] text-black bg-[#edf2fe]"
          : "border-[#d8d8dd] text-black hover:border-blue-200"
      }`}
    >
      <img src={icon} alt="" aria-hidden="true" className="h-6 w-6" />
      <span>{label}</span>
    </button>
  );
};

const MockQrCode = ({ value }: { value: string }) => {
  const cells = Array.from({ length: 21 * 21 }, (_, index) => {
    const row = Math.floor(index / 21);
    const column = index % 21;
    const inTopLeft = row < 7 && column < 7;
    const inTopRight = row < 7 && column > 13;
    const inBottomLeft = row > 13 && column < 7;

    if (inTopLeft || inTopRight || inBottomLeft) {
      const localRow = row % 14;
      const localColumn = column % 14;
      return (
        localRow === 0 ||
        localRow === 6 ||
        localColumn === 0 ||
        localColumn === 6 ||
        (localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4)
      );
    }

    const seed = value.charCodeAt(index % value.length) || 0;
    return (row * 3 + column * 5 + seed) % 7 < 3;
  });

  return (
    <div className="flex flex-col items-center rounded-[3px] border border-neutral-300 px-6 py-7">
      <svg
        aria-label="Mock QR code"
        className="h-[180px] w-[180px]"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="21" height="21" fill="white" />
        {cells.map(
          (isFilled, index) =>
            isFilled && (
              <rect
                key={index}
                x={index % 21}
                y={Math.floor(index / 21)}
                width="1"
                height="1"
                fill="black"
              />
            ),
        )}
      </svg>
      <p className="mt-4 text-center font-sans text-[13px] leading-5 text-neutral-700">
        this is mock QR code.
      </p>
    </div>
  );
};

const Payment = () => {
  const { selectedPlan } = useSubscription();
  const navigate = useNavigate();
  const paymentTimeoutRef = useRef<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [redeemCode, setRedeemCode] = useState("");
  const [isRedeemApplied, setIsRedeemApplied] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showPaymentError, setShowPaymentError] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    return () => {
      if (paymentTimeoutRef.current) {
        window.clearTimeout(paymentTimeoutRef.current);
      }
    };
  }, []);

  if (!selectedPlan) {
    return <Navigate to="/" replace />;
  }

  const discount = isRedeemApplied ? selectedPlan.price * 0.1 : 0;
  const total = selectedPlan.price - discount;

  const completePayment = () => {
    const receipt: ReceiptDetails = {
      plan: selectedPlan,
      paymentMethod,
      discount,
      total,
      orderNumber: `EP-${Date.now().toString().slice(-8)}`,
      paidAt: new Date().toISOString(),
    };

    setShowPaymentError(false);
    setIsProcessingPayment(true);

    paymentTimeoutRef.current = window.setTimeout(() => {
      navigate("/receipt", { state: { receipt } });
    }, 500);
  };

  const handleApplyRedeemCode = () => {
    setIsRedeemApplied(redeemCode.trim().toLowerCase() === "redeem");
  };

  const handleConfirmPayment = () => {
    if (isProcessingPayment) {
      return;
    }

    if (paymentMethod === "qr") {
      completePayment();
      return;
    }

    const isCardFormCompleted =
      cardholderName.trim().length > 0 &&
      cardNumber.replace(/\s/g, "").length >= 16 &&
      expiryDate.length === 7 &&
      cvv.length === 3;

    if (!isCardFormCompleted) {
      setShowPaymentError(true);
      return;
    }

    completePayment();
  };

  return (
    <section className="w-full h-full bg-surface-cream p-10 xl:px-[140px] xl:py-[96px]">
      <div className="mx-auto w-full lg:max-w-[1000px] bg-surface-white px-6 py-10 sm:px-[100px] xl:px-[290px] xl:pt-[48px] xl:pb-[90px]">
        <p className="text-[32px] leading-6 font-serif-text font-normal text-black text-center">
          Payment Information
        </p>

        <PaymentStepIndicator currentStep="payment" />

        {/* Selected Plan */}
        <div className="mt-10">
          <p className="font-serif-display text-[18px] leading-5 text-black font-normal">
            Order Item
          </p>
          <div className="h-px bg-black w-full mt-3" />

          <div className="mt-[22px] bg-[#EDF2FE] w-full flex flex-col items-center py-5 mb-6 px-4">
            <p className="font-serif-display text-[18px] leading-5 text-black font-normal text-center">
              Epaper {selectedPlan.period}
            </p>
            <p className="font-sans text-[13px] leading-5 text-[#6e6e6e] font-normal mt-2 text-center">
              {selectedPlan.price.toLocaleString()} Baht for{" "}
              {selectedPlan.period}
              <br />
              You can cancel anythime
            </p>
          </div>

          <a
            href="/#subscribe"
            className="font-sans text-[13px] leading-5 text-[#346AEA] font-normal text-center underline"
          >
            Change plans
          </a>

          {/* redeem code */}
          <div className="h-px bg-[#D1D5DB] w-full mt-6 mb-3" />
          <div className="flex w-full items-center gap-2.5">
            <div className="min-w-0 flex-1">
              <Input
                // label="Cardholder Name"
                value={redeemCode}
                onChange={(value) => {
                  setRedeemCode(value);
                  setIsRedeemApplied(false);
                }}
                placeholder="use redeem"
              />
            </div>

            <CustomButton
              title="APPLY"
              onClick={handleApplyRedeemCode}
              size="small"
              font="sans"
              className="!w-[75px] !min-w-[75px] shrink-0 !px-0"
            />
          </div>

          <div className="w-full flex justify-between items-center mt-[30px]">
            <p className="text-[15px] text-black font-sans leading-5 font-normal">
              Price
            </p>
            <p className="text-[13px] text-black font-sans leading-5 font-normal">
              {selectedPlan.price.toLocaleString()} Baht
            </p>
          </div>
          {isRedeemApplied && (
            <div className="w-full flex justify-between items-center mt-2.5">
              <p className="text-[15px] text-black font-sans leading-5 font-normal">
                Discount:
              </p>
              <p className="text-[13px] text-[#ff0000] font-sans leading-5 font-normal">
                - {discount.toLocaleString()} Baht
              </p>
            </div>
          )}
          <div className="w-full flex justify-between items-center mt-2.5">
            <p className="text-[15px] text-black font-serif-display leading-5 font-normal">
              Total
            </p>
            <p className="text-[15px] text-black font-serif-display leading-5 font-normal">
              {total.toLocaleString()} Baht
            </p>
          </div>

          <div className="h-px bg-[#D1D5DB] w-full mt-3" />
        </div>

        {/* payment method */}
        <div className="space-y-4 mt-10">
          <p className="font-serif-display text-[18px] leading-5 text-black font-normal">
            Payment method
          </p>
          <div className="h-px bg-black w-full mt-3" />

          <div className="bg-[#527DFA] px-[28px] py-[18px] flex justify-center items-center rounded-[3px]">
            <p className="text-[15px] text-surface-white font-sans leading-5 font-normal text-center">
              After payment, you will be redirected to the information page.
              Please accept T&Cs
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <PaymentMethodOption
              icon={CreditCardIcon}
              isSelected={paymentMethod === "card"}
              label="Credit Card"
              onClick={() => {
                setPaymentMethod("card");
                setShowPaymentError(false);
              }}
            />
            <PaymentMethodOption
              icon={QrCodeIcon}
              isSelected={paymentMethod === "qr"}
              label="QR Code"
              onClick={() => {
                setPaymentMethod("qr");
                setShowPaymentError(false);
              }}
            />
          </div>

          {paymentMethod === "card" ? (
            <div className="mt-6 flex flex-col gap-2.5">
              <Input
                label="Cardholder Name"
                value={cardholderName}
                onChange={(value) => {
                  setCardholderName(value);
                  setShowPaymentError(false);
                }}
                placeholder="Cardholder Name"
              />

              <Input
                label="Card Number"
                variant="cardNumber"
                value={cardNumber}
                onChange={(value) => {
                  setCardNumber(value);
                  setShowPaymentError(false);
                }}
              />

              <div className="grid grid-cols-2 gap-[14px]">
                <Input
                  label="Expiry Date"
                  variant="expiry"
                  value={expiryDate}
                  onChange={(value) => {
                    setExpiryDate(value);
                    setShowPaymentError(false);
                  }}
                />
                <Input
                  label="CVV"
                  variant="cvv"
                  value={cvv}
                  onChange={(value) => {
                    setCvv(value);
                    setShowPaymentError(false);
                  }}
                  trailingIcon={<SecurityCodeIcon />}
                />
              </div>
            </div>
          ) : (
            <MockQrCode
              value={`${selectedPlan.id}-${selectedPlan.period}-${selectedPlan.price}`}
            />
          )}

          {showPaymentError && (
            <p className="text-center font-sans text-[15px] font-normal leading-5 text-[#ff0000]">
              Please complete payment information before continuing.
            </p>
          )}

          <CustomButton
            title={
              isProcessingPayment ? "Processing payment..." : "Confirm Payment"
            }
            onClick={handleConfirmPayment}
            disabled={isProcessingPayment}
          />
        </div>
      </div>
    </section>
  );
};

export default Payment;
