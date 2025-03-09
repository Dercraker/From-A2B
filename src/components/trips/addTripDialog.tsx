"use client";

import { ImageInput } from "@components/images/ImageUploadInput";
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
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { phCapture } from "@lib/postHog/eventCapture";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { FormOptionalSection } from "../form/FormOptionalSection";
import { LoadingButton } from "../form/LoadingButton";
import { DateTimePicker } from "../ui/DateTimePicker";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

type AddTripDialogProps = PropsWithChildren;

export const AddTripDialog = (props: AddTripDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddTripSchema,
    defaultValues: {
      image: {
        url: "https://picsum.photos/600/400",
        file: undefined,
      },
    },
  });
  const router = useRouter();

  const { mutateAsync: addTripMutationAsync, isPending } = useMutation({
    mutationFn: async (values: AddTripSchema) => {
      const result = await AddTripAction(values);
      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      const blobUrl = form.getValues("image")?.url;

      phCapture("TripCreate");

      toast.success("Your trip as been created.");
      form.reset();
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }

      router.push(result.data);
      setOpen(false);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) form.reset();
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        {props.children ?? <Button variant="filled">Add Trip</Button>}
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
          onReset={() => {
            const blobUrl = form.getValues("image");
            if (blobUrl?.url) {
              URL.revokeObjectURL(blobUrl.url);
            }
            form.reset();
          }}
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
                    granularity="day"
                    hideTimezone
                    value={field.value}
                    onChange={(date) => {
                      field.onChange(date ?? new Date());
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
                  <ImageInput
                    className="h-[200px] w-[300px] rounded-md"
                    onChange={(file) => field.onChange(file)}
                    imageUrl={field.value?.url}
                    maxSizePicture={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            loading={isPending}
            disabled={!form.formState.isValid}
          >
            Create new trip
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
