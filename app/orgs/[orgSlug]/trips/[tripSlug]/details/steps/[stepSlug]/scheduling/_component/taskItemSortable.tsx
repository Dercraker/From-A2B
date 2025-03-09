"use client";

import { Typography } from "@components/ui/typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@generated/modelSchema";
import { cn } from "@lib/utils";
import { InlineTooltip } from "@ui/tooltip";
import { differenceInHours, format } from "date-fns";
import { CalendarClock, GripVertical } from "lucide-react";
import { useParams } from "next/navigation";
import { DeleteTaskAlertDialog } from "./deleteTaskAlertDialog";
import { TaskStatusSelect } from "./taskStatusSelect";
import { TaskUpdateDialog } from "./taskUpdateDialog";

export type TaskItemSortableProps = {
  task: Task;
  className?: string;
};

export const TaskItemSortable = ({
  task,
  className,
}: TaskItemSortableProps) => {
  const { stepSlug, tripSlug, orgSlug } = useParams();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

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
        "flex cursor-default select-none items-center justify-between gap-2 p-3 hover:bg-muted/60 group",
        className,
        task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.state !== "Done" &&
          task.state !== "Canceled"
          ? "border-l-4 border-l-red-500"
          : "",
      )}
    >
      <div className="flex items-center gap-3">
        <GripVertical
          className="cursor-grabbing text-muted-foreground"
          {...listeners}
        />
        <TaskStatusSelect
          taskId={task.id}
          currentState={task.state}
          stepSlug={stepSlug as string}
          tripSlug={tripSlug as string}
          orgSlug={orgSlug as string}
        />
        <TaskUpdateDialog
          task={task}
          stepSlug={stepSlug as string}
          tripSlug={tripSlug as string}
        >
          <Typography
            variant="lead"
            className={cn(
              "mr-2 overflow-hidden text-ellipsis text-nowrap hover:underline",
              task.state === "Done" && "line-through",
              task.state === "Canceled" && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </Typography>
        </TaskUpdateDialog>
      </div>
      <div className="flex items-center gap-2">
        {task.dueDate && (
          <div className="flex gap-2">
            {new Date(task.dueDate) < new Date() ? (
              <InlineTooltip title="Overdue">
                <CalendarClock className="size-4 text-red-500" />
              </InlineTooltip>
            ) : differenceInHours(new Date(task.dueDate), new Date()) < 48 ? (
              <InlineTooltip title="Due soon">
                <CalendarClock className="size-4 text-orange-500" />
              </InlineTooltip>
            ) : null}
            <Typography variant="small" className="text-muted-foreground">
              {format(new Date(task.dueDate), "dd MMM yyyy")}
            </Typography>
          </div>
        )}
        <TaskStatusSelect
          taskId={task.id}
          currentState={task.state}
          stepSlug={stepSlug as string}
          tripSlug={tripSlug as string}
          orgSlug={orgSlug as string}
          isBadge
        />
        <DeleteTaskAlertDialog
          taskId={task.id}
          taskName={task.title}
          tripSlug={tripSlug as string}
          stepSlug={stepSlug as string}
        />
      </div>
    </div>
  );
};
