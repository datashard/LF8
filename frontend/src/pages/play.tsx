import Dashboard from "@/components/layouts/Dashboard";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/Questions";
import { useStreakStore } from "@/providers/Streak";
import { useScoreStore } from "@/providers/Score";
import { useQuestionStore } from "@/providers/Questions";
import { QuestionStore } from "@/stores/Questions";
import { StreakStore } from "@/stores/Streak";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import he from "he";
import { ScoreStore } from "@/stores/Score";
import useTimer from "@/lib/hooks/useTimer";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import statements from "@/lib/statements";
import Link from "next/link";
import sql from "@/lib/sql";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
// import Timer from "@/components/custom/Timer";

export default function Play() {
  const QStore = useQuestionStore((s) => s);
  const StreakStore = useStreakStore((s) => s);
  const ScoreStore = useScoreStore((s) => s);
  const { timer, setTimer } = useTimer(-1);
  const [username, setUsername] = useState("Anon");
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const stopGame = () => {
    document.getElementById("game")?.classList.add("hidden");
    document.getElementById("end")?.classList.remove("hidden");
  };

  const hideStart = () => {
    document.getElementById("start")?.classList.add("hidden");
    document.getElementById("game")?.classList.remove("hidden");

    setTimer(5 * 60);
    // setTimer(5);
    setDisabled(false);
    ScoreStore.resetScore();
  };

  useEffect(() => {
    if (username === "") setUsername("Anon");
  }, [username]);

  useEffect(() => {
    if (timer === 0) stopGame();
  }, [timer]);

  const submitScore = async () => {
    console.log("submitting Score");
    axios
      .post("/api/points", { score: ScoreStore.score, username })
      .then((r) => {
        toast({
          title: "Score submitted",
          description: r.data,
        });
      });
    document.getElementById("submitButton")?.setAttribute("disabled", "true");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  return (
    <>
      <Dashboard page="Play">
        <div className="self-center">
          <div className="p-4">
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div id="start" className="">
            <h1 className="font-medium text-xl">
              Welcome to <span className="font-bold">Quizz</span>
            </h1>
            <div className="text-zinc-400 mt-5 mb-5">
              <p>
                The Goal is to answer as many questions correctly as possible{" "}
                <br /> within the Timelimit (5 Minutes)
              </p>
              <p>Are you ready?</p>
            </div>
            <Button className="bg-green-600 text-white" onClick={hideStart}>
              I'm Ready
            </Button>
          </div>

          <div
            id="timer"
            className={`flex justify-around ${
              timer >= 0 ? "visible" : "hidden"
            }`}
          >
            {timer >= 0 && <h1 id="time">{formatTime(timer)}</h1>}
            {ScoreStore.score >= 0 && <h1 id="score">{ScoreStore.score}</h1>}
          </div>
          <div id="game" className="hidden">
            <FormThing
              score={ScoreStore}
              streak={StreakStore}
              QStore={QStore}
            />
          </div>
          <div id="end" className="hidden">
            <Card>
              <CardHeader>
                <CardTitle>
                  {username === "Anon" || username === ""
                    ? "Submit your Score?"
                    : `Congrats ${username}!`}
                </CardTitle>
                <CardDescription>
                  You managed to get{" "}
                  <span className="font-bold">{ScoreStore.score} Points!</span>{" "}
                  <br />
                  {username === "Anon" || username === "" ? (
                    <span>
                      Would you like to to set a Username? <br />
                      If not, and you choose to submit your Score, it will be
                      published anonymously, using the handle "Anon"
                    </span>
                  ) : (
                    <span>
                      Your Score will be published under the handle "{username}"
                    </span>
                  )}
                  <br />
                  <br />
                  Would you like to publish your score to our Leaderboard?
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <Button
                  id="submitButton"
                  variant={"default"}
                  onClick={submitScore}
                  disabled={disabled}
                >
                  Publish it!
                </Button>
                <Link href={"/"}>
                  <Button variant={"destructive"}>Please don't.</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Dashboard>
    </>
  );
}

const FormThing = (props: {
  score: ScoreStore;
  streak: StreakStore;
  QStore: QuestionStore;
}) => {
  // const form = useForm();
  const StreakStore = useStreakStore((state) => state);
  const ScoreStore = useScoreStore((s) => s);
  const Questions = randomizeQuestions(props.QStore.questions, 150);
  const [questions] = useState(Questions);

  const submitAnswer = (
    selected: string,
    correct: string,
    wrong: string[],
    qIDX: number
  ) => {

    if (selected == correct) {
      StreakStore.increaseStreak();
      ScoreStore.increaseScore(2 + StreakStore.streak);
    } else {
      ScoreStore.increaseScore(1);
      StreakStore.resetStreak();
    }
  };
  return (
    <>
      <Carousel
        className="w-full max-w-xl"
        // orientation="horizontal"
        opts={{
          watchDrag: false,
          // align: "center",
          startIndex: 0,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 ">
          {questions?.map((q, k) => (
            <CarouselItem
              id={`question-${k}`}
              key={k}
              className="pl-2 md:pl-4 items-center opacity-100"
            >
              <div className="m-2 flex-col items-start ">
                <Card className="relative">
                  <Badge className="absolute right-4 top-4">
                    Streak {StreakStore.streak}
                  </Badge>

                  <CardContent className="grid grid-flow-column-dense items-center justify-center">
                    <CardHeader>
                      {k}
                      <CardDescription>
                        {he.decode(`${q.category} - ${q.difficulty}`)}
                      </CardDescription>
                      <br />
                      <CardTitle>{he.decode(q.question)}</CardTitle>
                    </CardHeader>
                    <div className="flex justify-around flex-col">
                      {/* @ts-ignore */}
                      <CarouselNext question={q} submit={submitAnswer} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

function randomizeQuestions(
  questions: Question[],
  amount: number
): Question[] | undefined {
  if (!questions) return;
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
}
