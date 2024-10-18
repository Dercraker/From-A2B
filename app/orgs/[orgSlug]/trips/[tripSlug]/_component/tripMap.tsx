import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type TripMapProps = ComponentPropsWithoutRef<"div"> & {
  
}

export const TripMap = ({ className, ...props }: TripMapProps) => {
  return (
    <div className={cn("", className)} {...props}>
      MAP
    </div>
  );
}
