import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import he from "he";
import { Question } from "@/types/Questions";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

function QuestionType({
  submit,
  question,
  ...props
}: {
  submit: (
    selected: string,
    correct: string,
    wrong: string[]
  ) => void;
  question: Question;
  [k: string]: any;
}) {
  switch (question.type) {
    case "multiple":
      return [question.correct_answer, ...question.wrong_answers]
        .sort((a, b) => a.localeCompare(b))
        .map((qa, k) => {
          return (
            <Button
              ref={props.ref}
              variant={props.variant}
              size={props.size}
              className={cn(
                "absolute  m-2 p-4",
                props.orientation === "horizontal"
                  ? "-left-12 top-1/2 -translate-y-1/2"
                  : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                props.className
              )}
              disabled={!props.canScrollNext}
              {...props}
              onClick={(e) => {
                e.preventDefault();
                submit(
                  qa,
                  question.correct_answer,
                  question.wrong_answers
                );
                props.scrollNext();
              }}
              key={k}
            >
              {he.decode(qa)}
            </Button>
          );
        });
    case "boolean":
      return (
        <>
          <Button
            ref={props.ref}
            variant={props.variant}
            size={props.size}
            className={cn(
              "absolute  m-2 p-4",
              props.orientation === "horizontal"
                ? "-left-12 top-1/2 -translate-y-1/2"
                : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
              props.className
            )}
            disabled={!props.canScrollNext}
            {...props}
            onClick={(e) => {
              e.preventDefault();
              submit(
                "True",
                question.correct_answer,
                question.wrong_answers
              );
              props.scrollNext();
            }}
          >
            True
          </Button>
          <Button
            ref={props.ref}
            variant={props.variant}
            size={props.size}
            className={cn(
              "absolute  m-2 p-4",
              props.orientation === "horizontal"
                ? "-left-12 top-1/2 -translate-y-1/2"
                : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
              props.className
            )}
            disabled={!props.canScrollNext}
            {...props}
            onClick={(e) => {
              e.preventDefault();
              submit(
                "False",
                question.correct_answer,
                question.wrong_answers
              );
              props.scrollNext();
            }}
          >
            False
          </Button>
        </>
      );
  }
}

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(
  (
    // @ts-ignore
    { question, submitAnswer, className, variant = "outline", size, ...props },
    ref
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    const CarouselThings = {
      ref,
      variant,
      size,
      className,
      orientation,
      scrollNext,
      canScrollNext,
      ...props,
    };

    return <QuestionType submit={submitAnswer} question={question} {...CarouselThings} />;
  }
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
