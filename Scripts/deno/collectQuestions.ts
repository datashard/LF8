// SQL File => 02-insert-questions.sql

// Open Tivia DB: https://opentdb.com/
// Cluebase: https://cluebase.readthedocs.io/en/latest/
// Sammlung von Quiz-API's: https://rapidapi.com/search/quiz

import { wait } from "https://deno.land/x/wait@0.1.14/mod.ts";
import { Question, ReqCategory } from "./utils/types.ts";
import { sleep } from "https://deno.land/x/delayed@2.1.1/mod.ts";
import { TimedQueue } from "./utils/TimeQueue.ts";
import { ensureFileSync } from "https://deno.land/std@0.220.1/fs/mod.ts";

const Spinner = wait({
  text: "Requesting Categories...",
  spinner: "dots12",
  color: "yellow",
}).start();

const Q = new TimedQueue();
let requestedCategories: number;

Q.on("length", (a, b) => {
  requestedCategories = b - a ;
});

const SessionToken =
  (await fetch("https://opentdb.com/api_token.php?command=request").then((r) =>
    r.json()
  )).token;
sleep(6000);

const Questions: Set<Question> = new Set();
const Categories: Set<ReqCategory> = new Set();
// let finalContent: string;

const getQuestions = async (category: number, amount: number = 30) => {
  try {
    Spinner.text = `[${requestedCategories+1}/${Categories.size}] | Requesting ${amount} "${
      Array.from(Categories).filter((a) => a.id == category)[0].name
    }" Questions`;

    const resp = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&token=${SessionToken}`,
    );

    return await resp.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getCategories = async () => {
  try {
    const resp = await fetch(`https://opentdb.com/api_category.php`);
    return (await resp.json()).trivia_categories;
  } catch (error) {
    throw new Error(error);
  }
};

const handleCategories = (categories: ReqCategory[]) => {
  categories.forEach((c) => {
    Categories.add(c);
  });
  return Categories;
};

const handleQuestions = (questions: Question[]) => {
  questions.forEach((q) => {
    Questions.add(q);
  });
  return Questions;
};

const getQuestionsForCategories = () => {
  Spinner.text = "Requesting Questions...";
  return Array.from(Categories).forEach((cat) => {
    Q.addTask({
      callback: async () => {
        handleQuestions((await getQuestions(cat.id)).results);
      },
      time: 7000,
    });
  });
};

// Build the SQL File

const formatValue = (value: string) => {
  return value.replace("'", "''");
};

const insertCategory = (category: string) => {
  return `insert into category(category) values ('${formatValue(category)}');`;
};

const insertQuestion = (question: Question) => {
  return `insert into questions (type, question, difficulty, correct_answer, wrong_answers, category) values ('${
    formatValue(question.type)
  }', '${formatValue(question.question)}', '${
    formatValue(question.difficulty)
  }', '${formatValue(question.correct_answer)}', '{${
    question.incorrect_answers.map((it) => {
      return `${formatValue(it)}`;
    }).join(",")
  }}', (select (id) from category where category.category = '${
    formatValue(question.category).replaceAll('&amp;', '&')
  }'));`;
};

const createFile = () => {
  return `-- This file is generated by Scripts/deno/collectQuestions.ts
  -- Do not edit this file manually
  -- Run \`deno task questions\` to regenerate this file

-- Categories
${
    Array.from(Categories).map((cat) => {
      return insertCategory(cat.name);
    }).join("\n")
  }
  
-- Questions
${
    Array.from(Questions).map((q) => {
      return insertQuestion(q);
    }).join("\n")
  }
  
  `;
};

const path = `Scripts/entrypoint/02-insert-content.sql`;

async function write() {
  const content = createFile();

  await Deno.writeTextFile(
    path,
    content,
    {
      create: true,
    },
  );
}

if (import.meta.main) {
  try {
    await handleCategories(await getCategories());
    await getQuestionsForCategories();
    Q.start();
    ensureFileSync(path);
    Q.on("done", async () => {
      createFile();
      await write();
      Spinner.succeed("02-insert-content.sql generated");
      Deno.exit(0);
    });
  } catch (error) {
    console.error(error);
    Spinner.fail("Encountered an Error");
    Deno.exit(1);
  }
}
