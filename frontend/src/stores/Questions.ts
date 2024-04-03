import { Question } from "@/types/Questions";
import { createStore } from "zustand/vanilla";

export type QuestionState = {
  questions: Question[];
  answered: number;
};

export type QuestionActions = {
  setQuestions: (qs: Question[]) => void;
  answeredQuestion: () => void;
  getFilteredQuestion?: (categories: string) => Question[];
  getCategories: () => string[];
};

export type QuestionStore = QuestionState & QuestionActions;

export const initQuestionStore = (): QuestionState => {
  return { questions: [], answered: 0 };
};

export const defaultInitState: QuestionState = {
  questions: [],
  answered: 0,
};

export const createQuestionStore = (
  initState: QuestionState = defaultInitState,
) => {
  return createStore<QuestionStore>()((set, get) => ({
    ...initState,
    setQuestions: (qs: Question[]) => set(() => ({ questions: qs })),
    answeredQuestion: () => set(() => ({ answered: get().answered + 1 })),
    getFilteredQuestions: (categories: string[]) =>
      get().questions.filter((question) =>
        categories.includes(question.category)
      ),
    getCategories: () => getUniqueCategories(get().questions),
  }));
};

function getUniqueCategories(questions: Question[]): string[] {
  const categories = questions.map((question) => question.category);
  const uniqueCategories = Array.from(new Set(categories));
  return uniqueCategories;
}
