import { Card, CardContent } from "@ui/card";
import { ScheduleNotesMdxEditor } from "./scheduleNotesMdxEditor";

export type SchedulingCardProps = {};

export const SchedulingCard = (props: SchedulingCardProps) => {
  return (
    <Card className="pt-6">
      <CardContent>
        <ScheduleNotesMdxEditor />
      </CardContent>
    </Card>
  );
};
