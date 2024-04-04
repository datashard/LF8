import Dashboard from "@/components/layouts/Dashboard";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Dashboard page="Quizz">
        <h1 className="text-2xl">Welcome to Quizz!</h1>
        <p>
          Quizz lets you answer as many questions as possible, within a 5 minute
          time limit!
          <br />
          Maybe you can reach the top of the Leaderboard? Try it out and compete
          with your friends!
        </p>

        <Button className="w-24" variant={"secondary"}>
          <PlayIcon />
          Play
        </Button>

        <span className="text-sm">
          Questions taken from{" "}
          <Link className="text-orange-500 " href="https://opentdb.com/">
            OpenTDB
          </Link>
        </span>
      </Dashboard>
    </>
  );
}
