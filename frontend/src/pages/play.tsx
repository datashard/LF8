import Dashboard from "@/components/layouts/Dashboard";
import { Button } from "@/components/ui/button";
import { useStreakStore } from "@/providers/Streak";
import { useForm } from "react-hook-form";
import { Question } from "@/types/Questions";
import { useQuestionStore } from "@/providers/Questions";
import { StreakStore } from "@/stores/Streak";
import { QuestionStore } from "@/stores/Questions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Play() {
  const QStore = useQuestionStore((s) => s);
  const streak = useStreakStore((state) => state);
  const answeredList = [];

  const hideStart = () => {
    document.getElementById("start")?.classList.add("hidden");
    document.getElementById("game")?.classList.remove("hidden");
  };

  return (
    <>
      <Dashboard page="Play">
        <div className="self-center">
          <div id="start" className="">
            <h1 className="font-medium text-xl">
              Welcome to <span className="font-bold">Quizz</span>
            </h1>
            <div className="text-zinc-400 mt-5 mb-5">
              <p>
                The Goal is to answer as many questions correctly as possible{" "}
                <br /> within the Timelimit
              </p>
              <p>Are you ready?</p>
            </div>
            <Button className="bg-green-600 text-white" onClick={hideStart}>
              Yes!
            </Button>
          </div>
          <div id="game" className="bg-zinc-900 rounded-xl hidden">
            <FormThing streak={streak} QStore={QStore} />
          </div>
        </div>
      </Dashboard>
    </>
  );
}

const FormThing = (props: { streak: StreakStore; QStore: QuestionStore }) => {
  const form = useForm();
  const streak = useStreakStore((state) => state);

  const Questions = randomizeQuestions(props.QStore.questions, 150);

  const submitAnswer = (
    selected: string,
    correct: string,
    wrong: string[],
    qIDX: number
  ) => {
    if (selected == correct) {
      console.log("Correct!", { selected, correct });
      streak.increaseStreak();
    } else {
      console.log("Wrong!", { selected, correct });
      streak.resetStreak();
    }
    nextQuestion(qIDX);
  };

  const nextQuestion = (current_Idx: number) => {
    document.getElementById(`question-${current_Idx}`)?.classList.add("hidden");
    document
      .getElementById(`question-${current_Idx + 1}`)
      ?.classList.add("visible");
  };

  return (
    <>
      <Carousel
        className="w-full max-w-xl"
        orientation="vertical"
        opts={{
          align: "center",
          startIndex: 0,
        }}
      >
        <CarouselContent className="-mt-1">
          {Questions?.map((q, k) => (
            <CarouselItem key={k} className="pt-1 md:basis-1/2">
              <div className="p-1 flex-col items-start">
                <Card>
                  <CardContent className="grid grid-flow-column-dense items-center justify-center">
                    <CardHeader>
                      <CardTitle>
                        {q.category} - {q.difficulty}
                      </CardTitle>
                      <CardDescription>{q.question}</CardDescription>
                    </CardHeader>
                    <div className="p-5">
                      <QuestionType
                        qIDX={k}
                        question={q}
                        submit={submitAnswer}
                      />
                    </div>
                  </CardContent>
                  {/* <CarouselPrevious /> */}
                  {/* <CarouselNext /> */}
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        <CarouselNext />
      </Carousel>
    </>
  );

  // return (
  //   <Form {...form}>
  //     <form className="flex flex-col">
  //       {Questions?.map((q, k) => {
  //         return (
  //           <div id={`question-${k}`} className="" key={k}>
  //             <h1 className="p-2 text-1xl font-bold text-zinc-500">
  //               {q.category} ({q.difficulty})
  //             </h1>
  //             <FormField
  //               control={form.control}
  //               name={`question-${k}`}
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="p-2 font-normal ">
  //                     {q.question} _ {q.correct_answer} _ {k}
  //                   </FormLabel>
  //                   <br />
  //                   <FormControl className="p-5 grid grid-flow-row-dense grid-cols-3 grid-rows-3">
  // <QuestionType
  //   qIDX={k}
  //   question={q}
  //   submit={submitAnswer}
  // />
  //                   </FormControl>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />
  //           </div>
  //         );
  //       })}
  //     </form>
  //   </Form>
  // );
};

function randomizeQuestions(
  questions: Question[],
  amount: number
): Question[] | undefined {
  if (!questions) return;
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
}

function QuestionType({
  submit,
  question,
  qIDX,
}: {
  submit: (
    selected: string,
    correct: string,
    wrong: string[],
    qIDX: number
  ) => void;
  question: Question;
  qIDX: number;
}) {
  switch (question.type) {
    case "multiple":
      return [question.correct_answer, ...question.wrong_answers]
        .sort(() => 0.5 - Math.random())
        .map((qa, k) => {
          return (
            <Button
              className="m-2 p-4"
              onClick={(e) => {
                e.preventDefault();
                submit(
                  qa,
                  question.correct_answer,
                  question.wrong_answers,
                  qIDX
                );
              }}
              key={k}
            >
              {qa}
            </Button>
          );
        });
    case "boolean":
      return (
        <>
          <Button
            className="m-2 p-4"
            onClick={(e) => {
              e.preventDefault();
              submit(
                "True",
                question.correct_answer,
                question.wrong_answers,
                qIDX
              );
            }}
          >
            True
          </Button>
          <Button
            className="m-2 p-4"
            onClick={(e) => {
              e.preventDefault();
              submit(
                "False",
                question.correct_answer,
                question.wrong_answers,
                qIDX
              );
            }}
          >
            False
          </Button>
        </>
      );
  }
}
