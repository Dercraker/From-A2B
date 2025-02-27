import { cn } from "@lib/utils";
import type { ComponentProps } from "react";

export type DividerProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

export const Divider = ({
  className,
  children,
  orientation = "horizontal",
  ...props
}: DividerProps) => {
  const isVertical = orientation === "vertical";

  return (
    <span className={cn("relative flex justify-center", className)} {...props}>
      <div
        className={cn(
          "absolute",
          isVertical
            ? "inset-y-0 left-1/2 w-px -translate-x-1/2"
            : "inset-x-0 top-1/2 h-px -translate-y-1/2",
          "bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75",
        )}
      ></div>

      <span
        className={cn("relative z-10 bg-card", isVertical ? "py-6" : "px-6")}
      >
        {children}
      </span>
    </span>
  );
};
