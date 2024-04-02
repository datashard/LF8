import conn from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query =
      "select q.id, q.type, q.question, q.difficulty, q.correct_answer, q.wrong_answers, c.category from questions q left join category c on q.category = c.id";
    const result = await conn.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};
