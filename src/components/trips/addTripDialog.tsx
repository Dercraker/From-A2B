"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddTripAction } from "@/features/trip/add/addTrip.action";
import { AddTripSchema } from "@/features/trip/add/addTrip.schema";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "../form/LoadingButton";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

type AddTripDialogProps = PropsWithChildren;

export const AddTripDialog = (props: AddTripDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddTripSchema,
    defaultValues: {
      startDate: new Date(),
    },
  });
  const router = useRouter();

  const { mutateAsync: addTripMutationAsync, isPending } = useMutation({
    mutationFn: async (values: AddTripSchema) => {
      const result = await AddTripAction(values);
      if (!result?.data) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Your trip as been created.");
      form.reset();
      setOpen(false);

      return result.data;
    },
    onSuccess(data) {
      // TODO UNCOMMENT ME
      // if (data) router.push(data);
      // else router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        {props.children ? (
          props.children
        ) : (
          <Button variant="filled">Add Trip</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Trip</DialogTitle>
          <DialogDescription>
            Fill the form bellow to create a new trip.
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          onSubmit={async (v) => await addTripMutationAsync(v)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="My great trip to London" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "border-input",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto -translate-y-1/2"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isPending}>
            Create new trip
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
