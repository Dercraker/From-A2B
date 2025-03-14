import type { Step } from "@generated/modelSchema";
import { create } from "zustand";

type TripStore = {
  steps: Step[] | null | undefined;
  SetSteps: (steps: Step[] | null | undefined) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  steps: undefined,
  SetSteps: (steps) => set({ steps }),
}));
