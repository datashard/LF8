export type Question = {
  id: number;
  type: Type;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  wrong_answers: string[];
};

export type Difficulty = "easy" | "medium" | "hard";
export type Type = "boolean" | "multiple";
