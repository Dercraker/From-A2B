"use client";

import { FormOptionalSection } from "@components/form/FormOptionalSection";
import { LoadingButton } from "@components/form/LoadingButton";
import { AddTaskSchema } from "@feat/scheduling/addTask.schema";
import { useDisclosure } from "@hooks/useDisclosure";
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
import { type PropsWithChildren } from "react";

export type AddTaskDialogProps = PropsWithChildren<{}>;

export const AddTaskDialog = ({ children }: AddTaskDialogProps) => {
  const [isDialogOpen, { close, open, toggle }] = useDisclosure(true);
  const form = useZodForm({
    schema: AddTaskSchema,
  });

  //TODO Crée la mutation pour add la step

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(v) => {
        toggle();

        if (!v) form.reset();
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
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
              <FormItem>
                <FormLabel>Task name</FormLabel>
                <FormControl>
                  <Input placeholder="Buy plane tickets" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Separator />
          <LoadingButton disabled={!form.formState.isValid}>
            Add new task
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
