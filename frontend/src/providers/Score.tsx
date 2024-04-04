"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type ScoreStore,
  createScoreStore,
  initScoreStore,
} from "@/stores/Score";

export const ScoreStoreContext = createContext<StoreApi<ScoreStore> | null>(
  null
);

export interface ScoreStoreProviderProps {
  children: ReactNode;
}

export const ScoreStoreProvider = ({ children }: ScoreStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ScoreStore>>();
  if (!storeRef.current) {
    storeRef.current = createScoreStore(initScoreStore());
  }

  return (
    <ScoreStoreContext.Provider value={storeRef.current}>
      {children}
    </ScoreStoreContext.Provider>
  );
};

export const useScoreStore = <T,>(selector: (store: ScoreStore) => T): T => {
  const scoreStoreContext = useContext(ScoreStoreContext);

  if (!scoreStoreContext) {
    throw new Error(`scoreStoreContext must be used within ScoreStoreProvider`);
  }

  return useStore(scoreStoreContext, selector);
};
