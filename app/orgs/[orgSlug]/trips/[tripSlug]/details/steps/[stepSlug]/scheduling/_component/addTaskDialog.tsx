"use client";

import { FormOptionalSection } from "@components/form/FormOptionalSection";
import { LoadingButton } from "@components/form/LoadingButton";
import { StartTourBadge } from "@components/nextStepJs/StartTourBadge";
import { AddTaskSchema } from "@feat/scheduling/task/addTask.schema";
import { AddTaskToStepByStepSlugActionAction } from "@feat/scheduling/task/addTaskToStepByStepSlug.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { useDisclosure } from "@hooks/useDisclosure";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { StepPathParams } from "@type/next";
import { Checkbox } from "@ui/checkbox";
import { DateTimePicker } from "@ui/DateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@ui/form";
import { Input } from "@ui/input";
import { Separator } from "@ui/separator";
import { useParams } from "next/navigation";
import { NextStepViewport, useNextStep } from "nextstepjs";
import { type PropsWithChildren, useRef, useState } from "react";
import { toast } from "sonner";

export type AddTaskDialogProps = PropsWithChildren<{}>;

export const AddTaskDialog = ({ children }: AddTaskDialogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { tripSlug, stepSlug } = useParams<StepPathParams>();
  const [isDialogOpen, { close, open }] = useDisclosure(false);
  const [addAnother, setAddAnother] = useState(false);
  const form = useZodForm({
    schema: AddTaskSchema,
  });
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const result = await AddTaskToStepByStepSlugActionAction({
        stepSlug: stepSlug as string,
        title: form.getValues("title"),
        dueDate: form.getValues("dueDate"),
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError ?? "An error occurred", {
          description: "Please try again later or contact support",
        });
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(
          tripSlug as string,
          stepSlug as string,
        ),
      });

      toast.success("Task added successfully");

      if (addAnother) {
        form.reset({
          title: "",
          dueDate: undefined,
        });
        inputRef.current?.focus();
      } else {
        close();
      }
    },
  });

  const { currentTour } = useNextStep();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(v) => {
        if (!v && !currentTour) {
          form.reset();
          close();
        } else open();
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add new task
            <StartTourBadge
              tourName={TourNames.AddTaskTour}
              tooltip="Tour : Add Task"
              className="size-5"
            />
          </DialogTitle>
          <DialogDescription>
            Fill form below to create a new task on this step
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          onSubmit={() => {
            return;
          }}
          className="flex flex-col gap-4"
          onReset={() => {
            form.reset();
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem
                id={getTourStepSelector(TourNames.AddTaskTour, "TaskName")}
              >
                <FormLabel>Task name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Buy plane tickets"
                    {...field}
                    autoFocus
                    ref={inputRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <NextStepViewport
            id={getTourStepSelector(TourNames.AddTaskTour, "DueDate")}
          >
            <FormOptionalSection
              defaultOpen={Boolean(form.getValues("dueDate"))}
              label="Due Date"
              onToggle={(v) => {
                if (!v) form.setValue("dueDate", undefined);
              }}
            >
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <DateTimePicker
                      value={field.value}
                      className="w-full"
                      granularity="day"
                      hideTimezone
                      onChange={(date) => {
                        form.setValue("dueDate", date, {
                          shouldDirty: true,
                        });
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormOptionalSection>
          </NextStepViewport>
          <Separator />
          <div
            className="flex items-center space-x-2"
            id={getTourStepSelector(TourNames.AddTaskTour, "AddAnother")}
          >
            <Checkbox
              id="addAnother"
              checked={addAnother}
              onCheckedChange={(checked) => setAddAnother(checked as boolean)}
            />
            <label
              htmlFor="addAnother"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add another task
            </label>
          </div>
          <LoadingButton
            disabled={!form.formState.isValid}
            loading={isPending}
            onClick={async () => {
              await mutateAsync();
            }}
          >
            Add new task
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
