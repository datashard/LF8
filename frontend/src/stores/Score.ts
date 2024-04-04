import { createStore } from "zustand/vanilla";

export type ScoreState = {
  score: number;
};

export type ScoreActions = {
  increaseScore: (amount: number) => void;
  resetScore: () => void;
};

export type ScoreStore = ScoreState & ScoreActions;

export const initScoreStore = (): ScoreState => {
  return { score: 0 };
};

export const defaultInitState: ScoreState = {
  score: 0,
};

export const createScoreStore = (
  initState: ScoreState = defaultInitState,
) => {
  return createStore<ScoreStore>()((set) => ({
    ...initState,
    increaseScore: (amount: number) =>
      set((state) => ({ score: state.score + amount })),
    resetScore: () => set(() => ({ score: 0 })),
  }));
};
