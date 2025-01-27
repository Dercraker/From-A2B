"use client";

import { Button } from "@/components/ui/button";
import type { StepDto } from "@/features/steps/dto/stepDto.schema";
import { LocateFixed } from "lucide-react";

export type CenterMapMenuButtonProps = {
  step: StepDto;
};

export const CenterMapMenuButton = ({ step }: CenterMapMenuButtonProps) => {
  return (
    <Button
      variant="filled"
      className="flex items-center gap-2"
      //TODO: FIX THIS
      disabled
      // disabled={step.longitude === 0 || step.latitude === 0}
    >
      <LocateFixed />
      Center map
    </Button>
  );
};
