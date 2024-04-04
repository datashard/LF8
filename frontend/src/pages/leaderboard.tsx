import Dashboard from "@/components/layouts/Dashboard";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Leaderboard() {
  // const { questions } = useQuestionStore((s) => s);
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    axios
      .get("/api/leaderboard", {
        baseURL:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/"
            : undefined,
      })
      .then((r) => {
        setScoreboard(r.data);
      });
  }, [setScoreboard]);

  return (
    <>
      <Dashboard page="Leaderboard">
        <p className="text-2xl">Leaderboard</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Score</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scoreboard.map((q, k) => {
              return (
                <TableRow key={k}>
                  {/* @ts-ignore */}
                  <TableCell className="font-bold text-xl">{q.score}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{q.username}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{q.time}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Dashboard>
    </>
  );
}
