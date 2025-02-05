"use client";
import { cn } from "@/lib/utils";
import {
  IconCircleCheckFilled,
  IconCircleDashedCheck,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="relative mx-auto mt-40 flex max-w-xl flex-col justify-start">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

        return (
          <motion.div
            key={index}
            // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
            className={cn("text-left flex gap-2 mb-4")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <>
                  <IconCircleDashedCheck className="text-white" />
                </>
              )}
              {index <= value && (
                <IconCircleCheckFilled
                  className={cn(
                    "text-white",
                    value === index && "text-primary opacity-100",
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-white",
                value === index && "text-primary opacity-100",
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
  children,
  endTask,
}: PropsWithChildren<{
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  endTask?: () => void;
}>) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1),
      );
    }, duration);

    if (currentState + 1 === loadingStates.length && !loop && endTask)
      setTimeout(() => endTask(), duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
          className="fixed inset-0 z-[100] flex size-full items-center justify-center backdrop-blur-2xl"
        >
          <div className="relative  h-96">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
            {children}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 h-full bg-white bg-gradient-to-t [mask-image:radial-gradient(900px_at_center,transparent_30%,white)] dark:bg-black" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
