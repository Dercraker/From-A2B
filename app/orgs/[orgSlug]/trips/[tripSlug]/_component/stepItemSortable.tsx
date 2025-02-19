import { InlineTooltip } from "@components/ui/tooltip";
import { Typography } from "@components/ui/typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { StepDto } from "@feat/steps/dto/stepDto.schema";
import { GenerateStepLink } from "@feat/steps/steps.link";
import { cn } from "@lib/utils";
import { EllipsisVertical, GripVertical } from "lucide-react";
import Link from "next/link";
import { StepCounter } from "./stepCounter";
import { StepItemMenu } from "./stepItemMenu";

export type StepItemSortableProps = {
  tripSlug: string;
  orgSlug: string;
  step: StepDto;
  idx: number;
  className?: string;
};

export const StepItemSortable = ({
  step,
  idx,
  orgSlug,
  tripSlug,
  className,
}: StepItemSortableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex cursor-default select-none items-center justify-between gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <GripVertical
          className="cursor-grabbing text-muted-foreground"
          {...listeners}
        />
        <StepCounter order={idx + 1} />
      </div>
      <InlineTooltip title={step.name}>
        <Typography
          as={Link}
          href={GenerateStepLink({ orgSlug, tripSlug, stepSlug: step.slug })}
          variant="link"
          className="mr-2 overflow-hidden text-ellipsis text-nowrap text-xl"
        >
          {step.name}
        </Typography>
      </InlineTooltip>
      <StepItemMenu step={step}>
        <EllipsisVertical className="text-muted-foreground" />
      </StepItemMenu>
    </div>
  );
};
