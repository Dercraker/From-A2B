"use client";

import { ImageInput } from "@components/images/ImageUploadInput";
import { StartTourBadge } from "@components/nextStepJs/StartTourBadge";
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
import { useDisclosure } from "@hooks/useDisclosure";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import { phCapture } from "@lib/postHog/eventCapture";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { NextStepViewport, useNextStep } from "nextstepjs";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";
import { FormOptionalSection } from "../form/FormOptionalSection";
import { LoadingButton } from "../form/LoadingButton";
import { DateTimePicker } from "../ui/DateTimePicker";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

type AddTripDialogProps = PropsWithChildren;

export const AddTripDialog = (props: AddTripDialogProps) => {
  const [isOpen, { close, open }] = useDisclosure(false);
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
      router.push(result.data);

      const blobUrl = form.getValues("image")?.url;

      phCapture("TripCreate");

      toast.success("Your trip as been created.");
      form.reset();
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    },
  });

  const { currentTour } = useNextStep();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v && !currentTour) {
          form.reset();
          close();
        } else open();
      }}
    >
      <DialogTrigger asChild>
        {props.children ?? <Button variant="filled">Add Trip</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add Trip
            <StartTourBadge
              tourName={TourNames.NewTripTour}
              tooltip="Tour : Add Trip"
              className="size-5"
            />
          </DialogTitle>
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
              <FormItem
                id={getTourStepSelector(TourNames.NewTripTour, "Title")}
              >
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="My great trip to London" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <NextStepViewport
            id={getTourStepSelector(TourNames.NewTripTour, "Description")}
          >
            <FormOptionalSection
              defaultOpen={Boolean(form.getValues("description"))}
              label="Description"
              onToggle={(open) => {
                if (!open)
                  form.setValue("description", undefined, {
                    shouldDirty: true,
                  });
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
          </NextStepViewport>

          <Separator />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem
                className="flex flex-col"
                id={getTourStepSelector(TourNames.NewTripTour, "StartDate")}
              >
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
              <FormItem
                id={getTourStepSelector(TourNames.NewTripTour, "Picture")}
              >
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
            id={getTourStepSelector(TourNames.NewTripTour, "Submit")}
          >
            Create new trip
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
