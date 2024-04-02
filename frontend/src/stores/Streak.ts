import { createStore } from "zustand/vanilla";

export type StreakState = {
  streak: number;
};

export type StreakActions = {
  increaseStreak: () => void;
  resetStreak: () => void;
};

export type StreakStore = StreakState & StreakActions;

export const initStreakStore = (): StreakState => {
  return { streak: 0 };
};

export const defaultInitState: StreakState = {
  streak: 0,
};

export const createStreakStore = (
  initState: StreakState = defaultInitState,
) => {
  return createStore<StreakStore>()((set) => ({
    ...initState,
    increaseStreak: () => set((state) => ({ streak: state.streak + 1 })),
    resetStreak: () => set(() => ({ streak: 0 })),
  }));
};
