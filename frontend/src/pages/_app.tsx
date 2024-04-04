import { QuestionStoreProvider } from "@/providers/Questions";
import { StreakStoreProvider } from "@/providers/Streak";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { ScoreStoreProvider } from "@/providers/Score";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuestionStoreProvider>
      <StreakStoreProvider>
        <ScoreStoreProvider>
          <Component {...pageProps} />
          <Toaster />
        </ScoreStoreProvider>
      </StreakStoreProvider>
    </QuestionStoreProvider>
  );
}
