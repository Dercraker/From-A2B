"use client";

import { AddStepDialog } from "@components/steps/addStepDialog";
import { DeleteStepAlertDialog } from "@components/steps/deleteStepAlertDialog";
import { EditStepDialog } from "@components/steps/editStepDialog";
import { Button } from "@components/ui/button";
import { Divider } from "@components/ui/divider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import type { Step } from "@generated/modelSchema";
import { useDisclosure } from "@hooks/useDisclosure";
import { phCapture } from "@lib/postHog/eventCapture";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  Delete,
  Edit3,
} from "lucide-react";
import type { PropsWithChildren } from "react";
import { CenterMapMenuButton } from "./centerMapMenuButton";

export type StepItemMenuProps = PropsWithChildren<{
  step: Step;
}>;

export const StepItemMenu = ({ children, step }: StepItemMenuProps) => {
  const [open, handler] = useDisclosure(false);

  return (
    <Popover open={open} onOpenChange={() => handler.toggle()}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex select-none flex-col gap-2">
        <EditStepDialog step={step} onClose={() => handler.close()}>
          <Button variant="filled" className="flex items-center gap-2">
            <Edit3 />
            Edit step
          </Button>
        </EditStepDialog>
        <Divider />
        <CenterMapMenuButton step={step} onClick={() => handler.close()} />
        <Divider />
        <AddStepDialog afterStep={step} onClose={() => handler.close()}>
          <Button
            variant="filled"
            className="flex items-center gap-2"
            onClick={() => phCapture("AddStepBefore")}
          >
            <ArrowUpFromLine />
            Add step before
          </Button>
        </AddStepDialog>
        <AddStepDialog beforeStep={step} onClose={() => handler.close()}>
          <Button
            variant="filled"
            className="flex items-center gap-2"
            onClick={() => phCapture("AddStepAfter")}
          >
            <ArrowDownFromLine />
            Add step after
          </Button>
        </AddStepDialog>
        <Divider />
        <DeleteStepAlertDialog stepId={step.id} name={step.name}>
          <Button
            variant="filled"
            className="flex w-full items-center gap-2"
            onClick={() => handler.close()}
          >
            <Delete />
            Delete step
          </Button>
        </DeleteStepAlertDialog>
      </PopoverContent>
    </Popover>
  );
};
