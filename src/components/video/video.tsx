"use client";

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import ReactPlayer from "react-player";

export type VideoProps = ComponentPropsWithoutRef<"div"> &
  PropsWithChildren<{
    source: string;
    width: string;
    height: string;
  }>;

export const Video = ({
  source,
  children,
  height = "70%",
  width = "100%",
  className,
  ...props
}: VideoProps) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <ReactPlayer
        url={source}
        muted
        loop
        playing
        width={width}
        height={height}
      />
      <div className="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 ">
        {children}
      </div>
    </div>
  );
};
