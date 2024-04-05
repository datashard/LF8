import sql from "@/lib/sql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await sql`select s.id, s.score, s.time, p.username from score s left join players p on s.player = p.id order by s.score desc;`
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
