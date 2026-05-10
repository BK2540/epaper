import { useState } from "react";
import {
  getStoredPlan,
  SELECTED_PLAN_STORAGE_KEY,
  SubscriptionContext,
  type SubscribePlan,
} from "./subscription";

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPlan, setSelectedPlan] = useState<SubscribePlan | null>(
    getStoredPlan,
  );

  const selectPlan = (plan: SubscribePlan) => {
    setSelectedPlan(plan);
    localStorage.setItem(SELECTED_PLAN_STORAGE_KEY, JSON.stringify(plan));
  };

  const clearPlan = () => {
    setSelectedPlan(null);
    localStorage.removeItem(SELECTED_PLAN_STORAGE_KEY);
  };

  return (
    <SubscriptionContext.Provider
      value={{ selectedPlan, selectPlan, clearPlan }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}
