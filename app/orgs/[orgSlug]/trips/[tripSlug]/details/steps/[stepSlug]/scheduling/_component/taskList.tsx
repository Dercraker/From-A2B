"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TaskDto } from "@feat/scheduling/dto/taskDto.schema";
import { GetTasksByStepSlugAction } from "@feat/scheduling/task/getTasksByStepSlug.action";
import { useResortTasks } from "@feat/scheduling/task/useResortTasks.hook";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Loader } from "@ui/loader";
import { LoadingOverlay } from "@ui/loadingOverlay";
import { ScrollArea } from "@ui/scroll-area";
import { Typography } from "@ui/typography";
import { toast } from "sonner";
import { TaskItemSortable } from "./taskItemSortable";

export type TaskListProps = {
  stepSlug: string;
  tripSlug: string;
};

export const TaskList = ({ stepSlug, tripSlug }: TaskListProps) => {
  const {
    isPending,
    data: tasks,
    isError,
  } = useQuery({
    queryKey: STEP_KEY_FACTORY.Tasks(tripSlug as string, stepSlug as string),
    queryFn: async () => {
      const result = await GetTasksByStepSlugAction({
        stepSlug: stepSlug as string,
      });

      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch tasks. Please try again later.");
        return null;
      }

      return result.data ?? null;
    },
  });

  const { isPending: reSortTasksIsPending, mutateAsync: reSortTasksAsync } =
    useResortTasks({
      stepSlug: stepSlug as string,
      tripSlug: tripSlug as string,
    });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && !!tasks) {
      const oldIndex = tasks.findIndex((t: TaskDto) => t.id === active.id);
      const newIndex = tasks.findIndex((t: TaskDto) => t.id === over?.id);

      const newTasks = arrayMove(tasks, oldIndex, newIndex);

      await reSortTasksAsync({ tasks: newTasks });
    }
  };

  if (isPending)
    return (
      <div className="flex size-full flex-col overflow-hidden">
        <div className="flex select-none items-center justify-center gap-2">
          <Typography variant="lead">Loading tasks in progress</Typography>
          <Loader className="text-primary" />
        </div>
      </div>
    );

  if (isError)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch tasks. Please try again later.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="flex size-full flex-col overflow-hidden">
      {tasks && !!tasks.length && (
        <ScrollArea className="flex h-full grow">
          {reSortTasksIsPending && <LoadingOverlay />}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={async (event) => handleDragEnd(event)}
          >
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task: TaskDto) => (
                <TaskItemSortable
                  key={task.id}
                  task={task}
                  className="border-b border-input first:mt-2 first:border-t"
                />
              ))}
            </SortableContext>
          </DndContext>
        </ScrollArea>
      )}

      {!tasks?.length && (
        <div className="mt-4 flex select-none flex-col items-center justify-center">
          <Typography variant="lead">No tasks found</Typography>
        </div>
      )}
    </div>
  );
};
