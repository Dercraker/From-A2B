"use client";

import { Button } from "@ui/button";
import { Typography } from "@ui/typography";
import { AddTaskDialog } from "./addTaskDialog";
import { TaskList } from "./taskList";

export type ScheduleTasksProps = {
  stepSlug: string;
  tripSlug: string;
};

export function ScheduleTasks({ stepSlug, tripSlug }: ScheduleTasksProps) {
  return (
    <>
      <div className="flex gap-2">
        <Typography variant="h2">Tasks</Typography>
        <AddTaskDialog>
          <Button variant="outline">New task</Button>
        </AddTaskDialog>
      </div>
      <TaskList stepSlug={stepSlug} tripSlug={tripSlug} />
    </>
  );
}
