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

export function getStoredPlan() {
  const savedPlan = localStorage.getItem(SELECTED_PLAN_STORAGE_KEY);

  if (!savedPlan) {
    return null;
  }

  try {
    return JSON.parse(savedPlan) as SubscribePlan;
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
