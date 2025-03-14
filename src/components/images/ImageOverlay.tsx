import { cn } from "@lib/utils";
import type { PropsWithChildren } from "react";

export const ImageOverlay = (
  props: PropsWithChildren<{ isLoading?: boolean }>,
) => {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-0 size-full transition-opacity flex items-center justify-center",
        {
          "group-hover:bg-background/70 group-hover:opacity-100":
            !props.isLoading,
          "bg-background/70 opacity-100": props.isLoading,
        },
      )}
    >
      {props.children}
    </div>
  );
};
