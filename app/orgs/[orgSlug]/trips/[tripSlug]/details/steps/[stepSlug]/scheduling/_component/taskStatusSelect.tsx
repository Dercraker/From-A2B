"use client";

import type { TaskStatusType } from "@feat/scheduling/task/taskStatus.schema";
import { TaskStatusLabels } from "@feat/scheduling/task/taskStatus.schema";
import { useUpdateTaskStatus } from "@feat/scheduling/task/useUpdateTaskStatus.hook";
import { cn } from "@lib/utils";
import { TaskState } from "@prisma/client";
import { Badge } from "@ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {
  CheckIcon,
  CircleCheckBig,
  CircleDashed,
  CircleDotDashed,
  CircleSlash,
  CircleX,
} from "lucide-react";

type TaskStatusSelectProps = {
  taskId: string;
  currentState: TaskStatusType;
  stepSlug: string;
  tripSlug: string;
  isBadge?: boolean;
};

export const TaskStatusSelect = ({
  taskId,
  currentState,
  stepSlug,
  tripSlug,
  isBadge = false,
}: TaskStatusSelectProps) => {
  const { mutate: updateTaskStatus } = useUpdateTaskStatus({
    tripSlug,
    stepSlug,
  });

  const getStatusBadge = (state: TaskStatusType) => {
    switch (state) {
      case TaskState.Todo:
        return (
          <Badge variant="outline" className="cursor-pointer">
            Todo
          </Badge>
        );
      case TaskState.InProgress:
        return (
          <Badge variant="secondary" className="cursor-pointer">
            In Progress
          </Badge>
        );
      case TaskState.Blocked:
        return (
          <Badge variant="destructive" className="cursor-pointer">
            Blocked
          </Badge>
        );
      case TaskState.Done:
        return (
          <Badge variant="default" className="cursor-pointer">
            Done
          </Badge>
        );
      case TaskState.Canceled:
        return (
          <Badge
            variant="destructive"
            className="cursor-pointer border-red-500 bg-muted"
          >
            Canceled
          </Badge>
        );
    }
  };

  const getStatusIcon = (state: TaskStatusType) => {
    switch (state) {
      case TaskState.Todo:
        return (
          <CircleDashed className="size-5 cursor-pointer text-muted-foreground" />
        );
      case TaskState.Done:
        return (
          <CircleCheckBig className="size-5 cursor-pointer text-primary" />
        );
      case TaskState.InProgress:
        return (
          <CircleDotDashed className="size-5 cursor-pointer text-primary" />
        );
      case TaskState.Blocked:
        return <CircleSlash className="size-5 cursor-pointer text-red-500" />;
      case TaskState.Canceled:
        return <CircleX className="size-5 cursor-pointer text-gray-500" />;
    }
  };

  const handleStatusChange = (newState: TaskStatusType) => {
    if (newState === currentState) return;

    updateTaskStatus({
      taskId,
      state: newState,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isBadge ? getStatusBadge(currentState) : getStatusIcon(currentState)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(TaskStatusLabels).map(([state, label]) => (
          <DropdownMenuItem
            key={state}
            onClick={() => handleStatusChange(state as TaskStatusType)}
            className={cn(
              "flex items-center justify-between gap-2",
              currentState === state && "font-medium",
            )}
          >
            {currentState === state && <CheckIcon className="ml-2 size-4" />}
            {isBadge
              ? getStatusBadge(state as TaskStatusType)
              : getStatusIcon(state as TaskStatusType)}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
