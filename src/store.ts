import produce from "immer";
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
  mutateData: (newData: userType) => void;
  mutateStep: (newStep: stepType) => void;
}

export const useUser = create<storeType>()((set) => ({
  step: 1,
  mutateStep: (newStep) => {
    set(() => ({ step: newStep }));
  },
  mutateData: (newData) =>
    set((state) =>
      produce(state, (draft) => {
        draft.data = { ...draft.data, ...newData };
      })
    ),
}));
