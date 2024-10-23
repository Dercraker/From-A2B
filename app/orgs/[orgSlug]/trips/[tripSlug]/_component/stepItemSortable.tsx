import { InlineTooltip } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { StepDto } from "@/features/steps/dto/stepDto.schema";
import { GenerateStepLink } from "@/features/steps/steps.link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, GripVertical } from "lucide-react";
import Link from "next/link";
import { StepCounter } from "./stepCounter";
import { StepItemMenu } from "./stepItemMenu";

export type StepItemSortableProps = {
  tripSlug: string;
  orgSlug: string;
  step: StepDto;
  idx: number;
};

export const StepItemSortable = ({
  step,
  idx,
  orgSlug,
  tripSlug,
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
      className="flex h-16 cursor-default select-none items-center justify-between gap-2 border border-x-0 border-y-2 border-input bg-card px-4 shadow-md shadow-card"
    >
      <div className="flex items-center gap-1">
        <GripVertical
          className="cursor-grabbing text-muted-foreground"
          {...listeners}
        />
        <StepCounter order={idx + 1} />
      </div>
      <div className="flex items-center gap-2">
        <InlineTooltip title={step.name}>
          <Typography
            as={Link}
            href={GenerateStepLink({ orgSlug, tripSlug, stepSlug: step.slug })}
            variant="link"
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
