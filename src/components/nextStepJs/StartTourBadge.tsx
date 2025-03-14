"use client";

import type { TourName } from "@lib/onBoarding/nextStepTours";
import { cn } from "@lib/utils";
import { InlineTooltip } from "@ui/tooltip";
import { BadgeHelp } from "lucide-react";
import { useNextStep } from "nextstepjs";
import type { PropsWithChildren } from "react";

export type StartTourBadgeProps = {
  tourName: TourName;
  tooltip: string;
  className?: string;
};

export const StartTourBadge = ({
  tourName,
  children,
  tooltip,
  className,
}: PropsWithChildren<StartTourBadgeProps>) => {
  const { startNextStep } = useNextStep();

  return (
    <InlineTooltip title={tooltip}>
      <div onClick={() => startNextStep(tourName)}>
        {children ?? (
          <BadgeHelp
            className={cn(
              "cursor-pointer text-muted-foreground hover:text-primary",
              className,
            )}
          />
        )}
      </div>
    </InlineTooltip>
  );
};
