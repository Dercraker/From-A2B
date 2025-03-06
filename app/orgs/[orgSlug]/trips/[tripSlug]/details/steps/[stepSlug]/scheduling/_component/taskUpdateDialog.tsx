"use client";

import { FormOptionalSection } from "@components/form/FormOptionalSection";
import type { TaskDto } from "@feat/scheduling/dto/taskDto.schema";
import { UpdateTaskActionAction } from "@feat/scheduling/task/updateTask.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "@ui/DateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Separator } from "@ui/separator";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";
import { TaskNotesMdxEditor } from "./taskNotesMdxEditor";
export type TaskUpdateDialogProps = PropsWithChildren<{
  task: TaskDto;
  stepSlug: string;
  tripSlug: string;
}>;

export const TaskUpdateDialog = ({
  task,
  stepSlug,
  tripSlug,
  children,
}: TaskUpdateDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate: updateTask } = useMutation({
    mutationFn: async ({
      title,
      dueDate,
    }: {
      title?: string;
      dueDate?: Date;
    }) => {
      const result = await UpdateTaskActionAction({
        taskId: task.id,
        dueDate,
        title: title ?? task.title,
      });

      if (!isActionSuccessful(result)) {
        throw new Error(result?.serverError ?? "Something went wrong");
      }

      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
      });
      toast.success("Task updated");

      return result.data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle
            contentEditable
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                e.currentTarget.innerText !== task.title
              ) {
                e.stopPropagation();
                e.preventDefault();

                updateTask({
                  title: e.currentTarget.innerText,
                });
              }
            }}
            className="p-1"
            onBlur={(e) => {
              if (e.currentTarget.innerText !== task.title)
                updateTask({
                  title: e.currentTarget.innerText,
                });
            }}
          >
            {task.title}
          </DialogTitle>

          <Separator />

          <DialogDescription>
            <FormOptionalSection
              defaultOpen={!!task.dueDate}
              label="Due Date"
              onToggle={async (v) => {
                if (!v)
                  await updateTask({
                    dueDate: undefined,
                  });
              }}
            >
              <DateTimePicker
                hideTimezone
                granularity="day"
                className="text-white"
                value={task.dueDate ?? undefined}
                onChange={(date) => {
                  updateTask({
                    title: task.title,
                    dueDate: date,
                  });
                }}
              />
            </FormOptionalSection>
            <Separator className="mt-2" />
          </DialogDescription>
        </DialogHeader>
        <TaskNotesMdxEditor
          markdown={task.notes ?? ""}
          stepSlug={stepSlug}
          tripSlug={tripSlug}
          taskId={task.id}
        />
      </DialogContent>
    </Dialog>
  );
};
