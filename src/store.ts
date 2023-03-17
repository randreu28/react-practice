import { create } from "zustand";

export interface infoType {
  name: string;
  email: string;
  tel: string;
}

export interface planType {
  type: "arcade" | "advanced" | "pro";
  billing: "monthly" | "yearly";
}

export interface optionsType {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
}

export interface serviceType {
  plan?: planType;
  options?: optionsType;
}

export interface userType {
  info?: infoType;
  service?: serviceType;
}

export type stepType = 1 | 2 | 3 | 4;

export interface storeType {
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
