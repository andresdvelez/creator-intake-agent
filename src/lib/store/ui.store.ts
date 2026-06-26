"use client";

import { create } from "zustand";
import { markTourDone } from "@/utils/tour.utils";

export type { TourStep } from "@/lib/data/tour-steps";
export { TOUR_STEPS } from "@/lib/data/tour-steps";
export { shouldShowTourOnMount } from "@/utils/tour.utils";

interface UIStore {
  tourActive: boolean;
  startTour: () => void;
  endTour: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  tourActive: false,
  startTour: () => set({ tourActive: true }),
  endTour: () => {
    markTourDone();
    set({ tourActive: false });
  },
}));
