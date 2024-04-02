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
import { useQuestionStore } from "@/providers/Questions";
import { QuestionStore } from "@/stores/Questions";
import { useStore } from "zustand";

export default function Leaderboard() {
  // @ts-ignore
  const q = useStore<QuestionStore, QuestionStore>(
    useQuestionStore,
    (state) => state
  );

  // const { questions, setQuestions } = useQuestionStore((s) => s);
  // const fragen = useMemo(() => {
  //   if (questions.length === 0) {
  //     axios.get("/api/questions").then((r) => {
  //       setQuestions(r.data);
  //     });
  //   } else {
  //     return questions;
  //   }
  // }, [questions]);

  return (
    <>
      <Dashboard page="Questions">
        Questions
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Question</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody> */}
          {/* {fragen?.map((q, k) => { */}
          {/* return ( */}
          {/* <TableRow key={k}> */}
          {/* <TableCell className="font-medium">{q.id}</TableCell> */}
          {/* <TableCell>{q.type}</TableCell> */}
          {/* <TableCell>{q.difficulty}</TableCell> */}
          {/* <TableCell>{q.category}</TableCell> */}
          {/* <TableCell>{q.question}</TableCell> */}
          {/* <TableCell>Credit Card</TableCell> */}
          {/* <TableCell className="text-right">$250.00</TableCell> */}
          {/* </TableRow> */}
          {/* ); */}
          {/* })} */}
          {/* </TableBody> */}
        </Table>
      </Dashboard>
    </>
  );
}
