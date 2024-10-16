import { AddStepDialog } from "@/components/steps/addStepDialog";
import { DeleteStepAlertDialog } from "@/components/steps/deleteStepAlertDialog";
import { EditStepDialog } from "@/components/steps/editStepDialog";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StepDto } from "@/features/steps/dto/stepDto.schema";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  Delete,
  Edit3,
  LocateFixed,
} from "lucide-react";
import { PropsWithChildren } from "react";

export type StepItemMenuProps = PropsWithChildren<{
  step: StepDto;
}>;

export const StepItemMenu = ({ children, step }: StepItemMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex select-none flex-col gap-2">
        <EditStepDialog step={step}>
          <Button variant="filled" className="flex items-center gap-2">
            <Edit3 />
            Edit step
          </Button>
        </EditStepDialog>
        <Divider />
        <Button variant="filled" className="flex items-center gap-2" disabled>
          <LocateFixed />
          Center map
        </Button>
        <Divider />
        <AddStepDialog beforeStep={step}>
          <Button variant="filled" className="flex items-center gap-2">
            <ArrowUpFromLine />
            Add step before
          </Button>
        </AddStepDialog>
        <AddStepDialog afterStep={step}>
          <Button variant="filled" className="flex items-center gap-2">
            <ArrowDownFromLine />
            Add step after
          </Button>
        </AddStepDialog>
        <Divider />
        <DeleteStepAlertDialog stepId={step.id} name={step.name}>
          <Button variant="filled" className="flex w-full items-center gap-2">
            <Delete />
            Delete step
          </Button>
        </DeleteStepAlertDialog>
      </PopoverContent>
    </Popover>
  );
};
