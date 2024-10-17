import { InlineTooltip } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { StepDto } from "@/features/steps/dto/stepDto.schema";
import { EllipsisVertical, GripVertical } from "lucide-react";
import { StepCounter } from "./stepCounter";
import { StepItemMenu } from "./stepItemMenu";

export type StepItemProps = {
  step: StepDto;
  idx: number;
};

export const StepItem = ({ step, idx }: StepItemProps) => {
  return (
    <div className="flex h-16 cursor-default select-none items-center justify-between gap-2 border border-x-0 border-y-2 border-input bg-card px-4 shadow-md shadow-card">
      <div className="flex items-center gap-1">
        <GripVertical className="cursor-grabbing text-muted-foreground" />
        <StepCounter order={idx + 1} />
      </div>
      <div className="flex items-center gap-2">
        <InlineTooltip title={step.name}>
          <Typography
            variant="default"
            className="overflow-hidden text-ellipsis text-nowrap text-xl"
          >
            {step.name}
          </Typography>
        </InlineTooltip>
        <StepItemMenu step={step}>
          <EllipsisVertical className="h-8 cursor-pointer rounded-lg text-muted-foreground active:bg-muted-foreground/10" />
        </StepItemMenu>
      </div>
    </div>
  );
};
