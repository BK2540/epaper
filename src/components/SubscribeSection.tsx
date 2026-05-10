import type { Subscribe } from "@/data/home";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSubscription } from "@/context/subscription";

type SubscribeProps = {
  contents: Subscribe[];
};

type SubscribeCardProps = {
  checked: boolean;
  content: Subscribe;
  onToggle: () => void;
};

const SubscribeCard = ({ checked, content, onToggle }: SubscribeCardProps) => {
  return (
    <motion.label
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`relative flex min-h-[145px] rounded-[3px] border  bg-surface-white px-4 py-3 font-sans md:min-w-[220px] lg:min-w-[280px] cursor-pointer hover:shadow-sm hover:border-blue-200 ${checked ? "border-neutral-200" : "border-neutral-300"}`}
    >
      {/* radio */}
      <div className="h-[22px] w-[22px] shrink-0 cursor-pointer">
        <input
          type="radio"
          name="subscribe-plan"
          checked={checked}
          onClick={onToggle}
          onChange={() => {}}
          className="peer sr-only"
        />
        <span className="block h-full w-full rounded-full border border-neutral-400 p-1 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600">
          {checked && (
            <span className="block h-full w-full rounded-full bg-black" />
          )}
        </span>
      </div>

      <div className="-ml-[22px] grid w-full grid-rows-[44px_40px_20px] items-start mt-3">
        <p className="row-start-1 flex items-start justify-center whitespace-pre-line text-center font-sans text-[15px] font-normal leading-5 text-black">
          {content.period}
        </p>

        <div className="row-start-2 flex flex-col items-center justify-start">
          <p className="text-center font-serif-display text-[20px] font-normal leading-5 text-blue-900">
            {content.price.toLocaleString()} Baht
          </p>
          <div className="h-5 text-center font-sans text-[11px] font-medium leading-5 text-neutral-500">
            {content.fullprice && (
              <span className="line-through">
                {content.fullprice.toLocaleString()} Baht/month
              </span>
            )}
          </div>
        </div>

        <p className="row-start-3 text-center font-sans text-[10px] font-light leading-5 text-neutral-700">
          {content.addition}
        </p>
      </div>

      {content.type && (
        <div className="absolute right-2 -top-3.5 bg-blue-100 px-3 py-1 rounded-lg">
          <p className="text-[12px] leading-5 font-semibold text-black">
            {content.type}
          </p>
        </div>
      )}
    </motion.label>
  );
};

const SubscribeSection = ({ contents }: SubscribeProps) => {
  const navigate = useNavigate();
  const { selectPlan } = useSubscription();
  const [selectedId, setSelectedId] = useState<string>("");
  const [showPlanError, setShowPlanError] = useState(false);
  const [isSubscribeButtonClicked, setIsSubscribeButtonClicked] =
    useState(false);

  const handleSubscribe = () => {
    if (!selectedId) {
      setShowPlanError(true);
      setIsSubscribeButtonClicked(false);
      return;
    }

    const selectedPlan = contents.find((content) => content.id === selectedId);

    if (!selectedPlan) {
      setShowPlanError(true);
      setIsSubscribeButtonClicked(false);
      return;
    }

    selectPlan(selectedPlan);
    setIsSubscribeButtonClicked(true);
    setTimeout(() => {
      navigate("/payment");
    }, 600);
  };

  return (
    <div
      id="subscribe"
      className="mt-[72px] mb-[58px] px-6 xl:px-[195px] 2xl:max-w-[1280px] w-full lg:min-w-[280px] flex flex-col items-center gap-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px] w-full lg:min-w-[280px]">
        {contents.map((content) => (
          // <SubscribeCard key={content.id} content={content} />
          <SubscribeCard
            key={content.id}
            checked={selectedId === content.id}
            content={content}
            onToggle={() => {
              setShowPlanError(false);
              setSelectedId((currentId) =>
                currentId === content.id ? "" : content.id,
              );
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2.5 items-center">
        {showPlanError && (
          <p className="text-center font-sans text-[15px] font-normal leading-5 text-[#ff0000]">
            No plan selected. Please choose one to continue.
          </p>
        )}
        <CustomButton
          title="Subscribe now"
          variant={isSubscribeButtonClicked ? "outline" : "solid"}
          onClick={handleSubscribe}
        />
        <p className="text-center font-sans text-[13px] font-normal leading-5 text-neutral-700">
          You can cancel anytime
        </p>
      </div>
    </div>
  );
};

export default SubscribeSection;
