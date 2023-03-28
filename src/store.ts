import { create } from "zustand";

export interface infoType {
  name: string;
  email: string;
  tel: string;
}

export enum plansType {
  arcade = "arcade",
  advanced = "advanced",
  pro = "pro",
}

export interface planType {
  type: plansType;
  yearlyBilling: boolean;
}

export interface optionsType {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
}

export interface serviceType {
  plan: planType;
  options: optionsType;
}

export type stepType = 1 | 2 | 3 | 4;

export interface storeType {
  info?: infoType;
  plan?: planType;
  options?: optionsType;
  step: stepType;
  goToStep: (newStep: stepType) => void;

  updateInfo: (updatedInfo: infoType) => void;
  updatePlan: (updatedPlan: planType) => void;
  updateOptions: (updatedOptions: optionsType) => void;
}

export const useUser = create<storeType>()((set) => ({
  step: 1,
  goToStep: (newStep) => {
    set(() => ({ step: newStep }));
  },
  updateInfo: (updatedInfo) => set(() => ({ info: updatedInfo })),
  updatePlan: (updatedPlan) => set(() => ({ plan: updatedPlan })),
  updateOptions: (updatedOptions) => set(() => ({ options: updatedOptions })),
}));
