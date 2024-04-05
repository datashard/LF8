import sql from "@/lib/sql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await sql`select * from questions where category=1;`
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
