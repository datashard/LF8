import { Question } from "@/types/Questions";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type QuestionState = {
  questions: Question[];
};

export type QuestionActions = {
  setQuestions: (qs: Question[]) => void;
  getFilteredQuestion?: (categories: string) => Question[];
  getCategories: () => string[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export type QuestionStore = QuestionState & QuestionActions;

// the store itself does not need any change
export const useQuestionStore = create(
  persist(
    (set, get) => ({
      questions: [],
      setQuestions: (qs: Question[]) => set(() => ({ questions: qs })),
      getFilteredQuestions: (categories: string[]) =>
        // @ts-ignore
        get().questions.filter((question: Question) =>
          categories.includes(question.category)
        ),
      // @ts-ignore
      getCategories: () => getUniqueCategories(get().questions),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        console.log('hydrated', state)
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "question-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state: any) => {
        console.log('onRehydrateStorage')
        state.setHasHydrated(true);
      },
    },
  ),
);

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useQuestionStore.persist.onHydrate(() => setHydrated(false))

    const unsubFinishHydration = useQuestionStore.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(useQuestionStore.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  return hydrated
}