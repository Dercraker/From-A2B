import { create } from "zustand";
import type { StepsDto } from "../steps/dto/stepDto.schema";

type TripStore = {
  steps: StepsDto | null | undefined;
  SetSteps: (steps: StepsDto | null | undefined) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  steps: undefined,
  SetSteps: (steps) => set({ steps }),
}));
