"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type QuestionStore,
  createQuestionStore,
  initQuestionStore,
} from "@/stores/Questions";

export const QuestionStoreContext =
  createContext<StoreApi<QuestionStore> | null>(null);

export interface QuestionStoreProviderProps {
  children: ReactNode;
}

export const QuestionStoreProvider = ({
  children,
}: QuestionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<QuestionStore>>();
  if (!storeRef.current) {
    storeRef.current = createQuestionStore(initQuestionStore());
  }

  return (
    <QuestionStoreContext.Provider value={storeRef.current}>
      {children}
    </QuestionStoreContext.Provider>
  );
};

export const useQuestionStore = <T,>(
  selector: (store: QuestionStore) => T
): T => {
  const questionStoreContext = useContext(QuestionStoreContext);

  if (!questionStoreContext) {
    throw new Error(
      `useQuestionStore must be used within QuestionStoreProvider`
    );
  }

  return useStore(questionStoreContext, selector);
};
