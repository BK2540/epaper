import { useState } from "react";
import Input from "@/components/Input";

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

const Payment = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <section className="mx-auto w-full max-w-[640px] px-4 py-10">
      <div className="space-y-4">
        <Input
          label="Cardholder Name"
          value={cardholderName}
          onChange={setCardholderName}
          placeholder="Cardholder Name"
        />

        <Input
          label="Card Number"
          variant="cardNumber"
          value={cardNumber}
          onChange={setCardNumber}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Expiry Date"
            variant="expiry"
            value={expiryDate}
            onChange={setExpiryDate}
          />
          <Input
            label="CVV"
            variant="cvv"
            value={cvv}
            onChange={setCvv}
            trailingIcon={<SecurityCodeIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default Payment;
