import { SectionLayout } from "@/components/layout/SectionLayout";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import type { ComponentPropsWithoutRef } from "react";
import type { ReviewItemProps } from "./ReviewItem";

export type ReviewInfiniteCardProps = ComponentPropsWithoutRef<"div"> & {};

export const ReviewInfiniteCard = ({
  children,
  className,
  ...props
}: ReviewInfiniteCardProps) => {
  const testimonials: ReviewItemProps[] = [
    {
      review:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      role: "A Tale of Two Cities",
      image: "toto",
    },
    {
      review:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      role: "Hamlet",
      image: "toto",
    },
    {
      review: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      role: "A Dream Within a Dream",
      image: "tt",
    },
    {
      review:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      role: "Pride and Prejudice",
      image: "toto",
    },
    {
      review:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      role: "Moby-Dick",
      image: "toto",
    },
  ];

  return (
    <SectionLayout variant="default" className=" antialiased" size="xl">
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </SectionLayout>
  );
};
