"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { AddTripAction } from "@feat/trip/add/addTrip.action";
import { AddTripSchema } from "@feat/trip/add/addTrip.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { FormOptionalSection } from "../form/FormOptionalSection";
import { LoadingButton } from "../form/LoadingButton";
import { ImageFormItem } from "../images/ImageFormItem";
import { DateTimePicker } from "../ui/DateTimePicker";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

type AddTripDialogProps = PropsWithChildren;

export const AddTripDialog = (props: AddTripDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddTripSchema,
    defaultValues: {
      image: "https://picsum.photos/600/400",
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
      router.refresh();
      if (data) router.push(data);
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
          onSubmit={async (v) => addTripMutationAsync(v)}
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

          <Separator />

          <FormOptionalSection
            defaultOpen={Boolean(form.getValues("description"))}
            label="Description"
            onToggle={(open) => {
              if (!open)
                form.setValue("description", undefined, { shouldDirty: true });
            }}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Any description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormOptionalSection>

          <Separator />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={(date) => {
                      form.setValue("startDate", date ?? new Date(), {
                        shouldDirty: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <ImageFormItem
                    className="h-[200px] w-[300px] rounded-md"
                    onChange={(url) => field.onChange(url)}
                    imageUrl={field.value}
                  />
                </FormControl>
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
