import { Question } from "@/types/Questions";
import { createStore } from "zustand/vanilla";

export type QuestionState = {
  questions: Question[];
};

export type QuestionActions = {
  setQuestions: (qs: Question[]) => void;
  getFilteredQuestion?: (categories: string) => Question[];
  getCategories: () => string[];
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
};

export type QuestionStore = QuestionState & QuestionActions;

export const initQuestionStore = (): QuestionState => {
  return { questions: [] };
};

export const defaultInitState: QuestionState = {
  questions: [],
};

export const createQuestionStore = (
  initState: QuestionState = defaultInitState,
) => {
  return createStore<QuestionStore>()((set, get) => ({
    ...initState,
    setQuestions: (qs: Question[]) => set(() => ({ questions: qs })),
    getFilteredQuestions: (categories: string[]) =>
      get().questions.filter((question) =>
        categories.includes(question.category)
      ),
    getCategories: () => getUniqueCategories(get().questions),
    _hasHydrated: false,
      setHasHydrated: (state: any) => {
        set({
          _hasHydrated: state,
        });
      },
  }));
};

function getUniqueCategories(questions: Question[]): string[] {
  const categories = questions.map((question) => question.category);
  const uniqueCategories = Array.from(new Set(categories));
  return uniqueCategories;
}
