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
import he from "he"

export default function Questions() {
  const { questions } = useQuestionStore((s) => s);

  return (
    <>
      <Dashboard page="Questions">
        Questions
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions?.map((q, k) => {
              return (
                <TableRow key={k}>
                  <TableCell className="font-medium">{q.id}</TableCell>
                  <TableCell>{he.decode(q.question)}</TableCell>
                  <TableCell>{q.category}</TableCell>
                  <TableCell>{q.difficulty}</TableCell>
                  <TableCell>{q.type}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Dashboard>
    </>
  );
}
