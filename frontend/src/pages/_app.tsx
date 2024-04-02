import { QuestionStoreProvider } from "@/providers/Questions";
import { StreakStoreProvider } from "@/providers/Streak";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuestionStoreProvider>
      <StreakStoreProvider>
        <Component {...pageProps} />
      </StreakStoreProvider>
    </QuestionStoreProvider>
  );
}
