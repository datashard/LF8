import Dashboard from "@/components/layouts/Dashboard";
import useStore from "@/lib/useStore";
import { useHydration, useQuestionStore } from "@/lib/useQuestionStore";
import { QuestionStore } from "@/stores/Questions";
import { Button } from "@/components/ui/button";
import { useStreakStore } from "@/providers/Streak";
import { useForm } from "react-hook-form";
import { Question } from "@/types/Questions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Play() {
  const isHydrated = useHydration();
  const q = useStore(useQuestionStore, (state) => state) as QuestionStore;

  const Questions = randomizeQuestions(q?.questions, 2);
  // const Questions = []
  const streak = useStore(useStreakStore, (state) => state);
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
          <div id="game" className="bg-zinc-900 rounded-xl text-wrap hidden">
            {!isHydrated ? (
              <p>Loading Questions...</p>
            ) : (
              <FormThing questions={Questions} />
            )}
          </div>
        </div>
      </Dashboard>
    </>
  );
}

const FormThing = (props: { questions?: Question[] }) => {
  const form = useForm();
  console.log(props.questions);

  return (
    <Form {...form}>
      <form className="flex flex-col">
        {props.questions?.map((q, k) => {
          return (
            <div key={k}>
              <h1 className="p-2 text-1xl font-bold text-zinc-500">
                {q.category} ({q.difficulty})
              </h1>
              <FormField
                control={form.control}
                name={`question-${k}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="p-2 font-normal ">
                      {q.question}
                    </FormLabel>
                    <br />
                    <FormControl className="p-5 grid grid-flow-row-dense grid-cols-3 grid-rows-3">
                      <QuestionType {...q} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
      </form>
    </Form>
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

function QuestionType(q: Question) {
  switch (q.type) {
    case "multiple":
      return [`${q.correct_answer} - C`, ...q.wrong_answers]
        .sort(() => 0.5 - Math.random())
        .map((qa, k) => {
          return <Button key={k}>{qa}</Button>;
        });
    case "boolean":
      return <>boolean</>;
  }
}
