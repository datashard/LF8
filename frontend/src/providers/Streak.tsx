"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type StreakStore,
  createStreakStore,
  initStreakStore,
} from "@/stores/Streak";

export const StreakStoreContext = createContext<StoreApi<StreakStore> | null>(
  null
);

export interface StreakStoreProviderProps {
  children: ReactNode;
}

export const StreakStoreProvider = ({ children }: StreakStoreProviderProps) => {
  const storeRef = useRef<StoreApi<StreakStore>>();
  if (!storeRef.current) {
    storeRef.current = createStreakStore(initStreakStore());
  }

  return (
    <StreakStoreContext.Provider value={storeRef.current}>{children}</StreakStoreContext.Provider>
  );
};

export const useStreakStore = <T,>(selector: (store: StreakStore) => T): T => {
  const streakStoreContext = useContext(StreakStoreContext);

  if (!streakStoreContext) {
    throw new Error(`useStreakStore must be used within StreakStoreProvider`);
  }

  return useStore(streakStoreContext, selector);
};
