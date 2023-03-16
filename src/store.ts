import { create } from "zustand";

interface infoType {
  name: string;
  email: string;
  phone: string;
}

interface planType {
  type: "arcade" | "advanced" | "pro";
  billing: "monthly" | "yearly";
}

interface optionsType {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
}

interface serviceType {
  plan?: planType;
  options?: optionsType;
}

interface userType {
  info?: infoType;
  service?: serviceType;
}

type stepType = 1 | 2 | 3 | 4;

interface storeType {
  data?: userType;
  step: stepType;
  mutateStep: (by: stepType) => void;
  mutateInfo: (info: infoType) => void;
  mutateOptions: (options: optionsType) => void;
  mutatePlan: (plan: planType) => void;
}

export const useUser = create<storeType>()((set) => ({
  step: 1,
  mutateStep: (newStep) => set(() => ({ step: newStep })),
  mutateInfo: (newInfo) => set(() => ({ data: { info: newInfo } })),
  mutateOptions: (newPlan) =>
    set(() => ({ data: { service: { options: newPlan } } })),
  mutatePlan: (newPlan) =>
    set(() => ({ data: { service: { plan: newPlan } } })),
}));
