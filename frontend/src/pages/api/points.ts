import sql from "@/lib/sql";
import statements from "@/lib/statements";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const result = await sql(statements.insertScore(req.body.username, req.body.score));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
