import Link from "next/link";
import {
  AlignJustify,
  CircleHelp,
  HelpCircle,
  Menu,
  Package2,
  Play,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useMemo } from "react";
import { QuestionStore } from "@/stores/Questions";
import { useQuestionStore } from "@/providers/Questions";
import axios from "axios";
import { useEffect } from "react";

const SidebarItems = [
  {
    page: "Play",
    icon: <Play className="h-4 w-4" />,
    badge: 0,
    link: "play",
  },
  {
    page: "Leaderboard",
    icon: <AlignJustify className="h-4 w-4" />,
    badge: 0,
    link: "leaderboard",
  },
  {
    page: "Questions",
    icon: <HelpCircle className="h-4 w-4" />,
    badge: 0,
    link: "questions",
  },
  // {page: "Leaderboard"},
];

export default function Dashboard({
  page = "Page",
  children,
}: {
  page?: string;
  children: React.ReactNode;
}) {
  const { questions, setQuestions } = useQuestionStore((s) => s);

  useEffect(() => {
    if (questions.length === 0) {
      axios
        .get("/api/questions", {
          baseURL:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/"
              : undefined,
        })
        .then((r) => {
          setQuestions(r.data);
        });
    }
  }, [questions]);

  return (
    <div key={1} className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div key={2} className="hidden border-r bg-muted/40 md:block">
        <div key={3} className="flex h-full max-h-screen flex-col gap-2">
          <div key={4} className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex  items-center gap-2 font-semibold">
              <CircleHelp className="h-6 w-6" />
              <span className="">Quizz</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SidebarItems.map((item, k) => {
                return (
                  <Link
                    key={k}
                    href={item.link}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {item.icon}
                    {item.page}
                    {item.badge !== 0 && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden visible">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  key={"awawawa"}
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">{page} awa</span>
                </Link>
                {SidebarItems.map((item, k) => {
                  return (
                    <>
                      <Link
                        key={k}
                        href={item.link}
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        {item.icon}
                        {item.page}
                        {item.badge !== 0 && (
                          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-center font-bold md:hidden visible">{page}</h1>
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
