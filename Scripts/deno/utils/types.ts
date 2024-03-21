export type Response = {
  response_code: number;
  results?: Question[];
};

export type Question = {
  type: Type;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Difficulty = "easy" | "medium" | "hard";
export type Type = "boolean" | "multiple";

export type ReqCategory = { id: number; name: string };
