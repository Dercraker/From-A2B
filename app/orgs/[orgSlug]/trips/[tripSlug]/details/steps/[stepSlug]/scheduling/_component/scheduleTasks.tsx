import { Button } from "@ui/button";
import { Typography } from "@ui/typography";
import { AddTaskDialog } from "./addTaskDialog";

export type ScheduleTasksProps = {};

export const ScheduleTasks = (props: ScheduleTasksProps) => {
  return (
    <div>
      <Typography variant="h2">Tasks</Typography>
      <AddTaskDialog>
        <Button variant="outline">New task</Button>
      </AddTaskDialog>
    </div>
  );
};
