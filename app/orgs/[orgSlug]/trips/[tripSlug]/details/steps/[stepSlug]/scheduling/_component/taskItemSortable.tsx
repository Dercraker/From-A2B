"use client";

import { Typography } from "@components/ui/typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskDto } from "@feat/scheduling/dto/taskDto.schema";
import { cn } from "@lib/utils";
import { TaskState } from "@prisma/client";
import { Badge } from "@ui/badge";
import { format } from "date-fns";
import {
  CircleCheckBig,
  CircleDashed,
  CircleDotDashed,
  CircleSlash,
  CircleX,
  GripVertical,
} from "lucide-react";
import { useParams } from "next/navigation";
import { DeleteTaskAlertDialog } from "./deleteTaskAlertDialog";

export type TaskItemSortableProps = {
  task: TaskDto;
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

  const getStatusIcon = () => {
    switch (task.state) {
      case TaskState.Todo:
        return <CircleDashed className="size-5 text-muted-foreground" />;
      case TaskState.Done:
        return <CircleCheckBig className="size-5 text-primary" />;
      case TaskState.InProgress:
        return <CircleDotDashed className="size-5 text-primary" />;
      case TaskState.Blocked:
        return <CircleSlash className="size-5 text-red-500" />;
      case TaskState.Canceled:
        return <CircleX className="size-5 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.state) {
      case TaskState.Todo:
        return <Badge variant="outline">Todo</Badge>;
      case TaskState.InProgress:
        return <Badge variant="secondary">In Progress</Badge>;
      case TaskState.Blocked:
        return <Badge variant="destructive">Blocked</Badge>;
      case TaskState.Done:
        return <Badge variant="default">Done</Badge>;
      case TaskState.Canceled:
        return (
          <Badge variant="destructive" className="border-red-500 bg-muted">
            Canceled
          </Badge>
        );
    }
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
        {getStatusIcon()}
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
      </div>
      <div className="flex items-center gap-2">
        {task.dueDate && (
          <Typography variant="small" className="text-muted-foreground">
            {format(new Date(task.dueDate), "dd MMM yyyy")}
          </Typography>
        )}
        {getStatusBadge()}
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
