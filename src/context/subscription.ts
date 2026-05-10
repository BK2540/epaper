import { createContext, useContext } from "react";
import type { Subscribe } from "@/data/home";

export type SubscribePlan = Pick<
  Subscribe,
  "id" | "period" | "price" | "fullprice" | "addition" | "type"
>;

export type SubscriptionContextType = {
  selectedPlan: SubscribePlan | null;
  selectPlan: (plan: SubscribePlan) => void;
  clearPlan: () => void;
};

export const SELECTED_PLAN_STORAGE_KEY = "selectedPlan";

export const SubscriptionContext = createContext<
  SubscriptionContextType | undefined
>(undefined);

function isSubscribePlan(value: unknown): value is SubscribePlan {
  if (!value || typeof value !== "object") {
    return false;
  }

  const plan = value as Partial<Record<keyof SubscribePlan, unknown>>;

  return (
    typeof plan.id === "string" &&
    typeof plan.period === "string" &&
    typeof plan.price === "number" &&
    typeof plan.addition === "string" &&
    (plan.fullprice === undefined || typeof plan.fullprice === "number") &&
    (plan.type === undefined || typeof plan.type === "string")
  );
}

export function getStoredPlan() {
  const savedPlan = localStorage.getItem(SELECTED_PLAN_STORAGE_KEY);

  if (!savedPlan) {
    return null;
  }

  try {
    const parsedPlan = JSON.parse(savedPlan);

    if (isSubscribePlan(parsedPlan)) {
      return parsedPlan;
    }

    localStorage.removeItem(SELECTED_PLAN_STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(SELECTED_PLAN_STORAGE_KEY);
    return null;
  }
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used inside SubscriptionProvider");
  }

  return context;
}
