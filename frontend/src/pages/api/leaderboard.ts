import sql from "@/lib/sql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await sql`"select q.id, q.type, q.question, q.difficulty, q.correct_answer, q.wrong_answers, c.category from questions q left join category c on q.category = c.id";`
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
