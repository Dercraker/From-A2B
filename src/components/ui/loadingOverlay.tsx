import { cn } from "@lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { Loader } from "./loader";
import { Typography } from "./typography";

export type LoadingOverlayProps = ComponentPropsWithoutRef<"div"> & {};

export const LoadingOverlay = ({
  children,
  className,
  ...props
}: LoadingOverlayProps) => {
  return (
    <div
      className={cn(
        "absolute bg-accent/60 z-10 h-full w-full flex items-center justify-center cursor-wait",
        className,
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Typography variant="lead" className="flex items-center gap-2">
          Loading <Loader className="text-primary" />
        </Typography>
      )}
    </div>
  );
};
