"use client";

import { FormOptionalSection } from "@components/form/FormOptionalSection";
import { SubmitButton } from "@components/form/SubmitButton";
import { ImageInput } from "@components/images/ImageUploadInput";
import { StartTourBadge } from "@components/nextStepJs/StartTourBadge";
import { GetTripAction } from "@feat/trip/get/getTrip.action";
import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import type { EditTrip } from "@feat/trip/update/editTrip.schema";
import { EditTripSchema } from "@feat/trip/update/editTrip.schema";
import { UpdateTripAction } from "@feat/trip/update/updateTrip.action";
import type { Trip } from "@generated/modelSchema";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import { phCapture } from "@lib/postHog/eventCapture";
import { cn } from "@lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { DateTimePicker } from "@ui/DateTimePicker";
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
import { Loader } from "@ui/loader";
import { Textarea } from "@ui/textarea";
import { useRouter } from "next/navigation";
import { NextStepViewport } from "nextstepjs";
import { toast } from "sonner";

export type EditTripFormProps = {
  tripSlug: string;
  className?: string;
};

export const EditTripForm = ({ tripSlug, className }: EditTripFormProps) => {
  const editTripForm = useZodForm({
    schema: EditTripSchema,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isTripPending } = useQuery({
    queryKey: TRIP_KEY_Factory.byId(tripSlug),
    queryFn: async () => {
      const result = await GetTripAction({ tripSlug });
      if (!isActionSuccessful(result)) {
        throw new Error("Failed to fetch trip. Please try again later.");
      }

      editTripForm.setValue("tripSlug", result.data.slug, {
        shouldDirty: false,
      });
      editTripForm.setValue("name", result.data.name, {
        shouldDirty: false,
      });
      editTripForm.setValue("startDate", result.data.startDate, {
        shouldDirty: false,
      });
      editTripForm.setValue("description", result.data.description, {
        shouldDirty: false,
      });
      editTripForm.setValue(
        "image",
        { url: result.data.image as string },
        { shouldDirty: false },
      );

      return result.data as Trip;
    },
  });

  const { mutate: UpdateTrip } = useMutation({
    mutationFn: async (values: EditTrip) => {
      const result = await UpdateTripAction(values);
      if (!isActionSuccessful(result)) {
        logger.error("Failed to update trip");
        toast.error("Failed to update trip. Please try again later.");
        router.back();
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: TRIP_KEY_Factory.byId(tripSlug),
      });
      toast.success("Trip updated successfully");

      phCapture("TripUpdate");
    },
  });

  return (
    <Form
      onSubmit={(formValues) => UpdateTrip(formValues)}
      onReset={() => {
        editTripForm.reset();
      }}
      form={editTripForm}
    >
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Trip details{" "}
            <StartTourBadge
              tourName={TourNames.TripDetailsTour}
              tooltip="Tour : Trip Details"
              className="size-5"
            />
          </CardTitle>
        </CardHeader>
        {isTripPending ? (
          <Loader className="text-primary" />
        ) : (
          <>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={editTripForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    id={getTourStepSelector(TourNames.TripDetailsTour, "Title")}
                  >
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="My trip to London..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <NextStepViewport
                id={getTourStepSelector(
                  TourNames.TripDetailsTour,
                  "Description",
                )}
              >
                <FormOptionalSection
                  defaultOpen={Boolean(editTripForm.getValues("description"))}
                  label="Description"
                  onToggle={(open) => {
                    if (!open)
                      editTripForm.setValue("description", null, {
                        shouldDirty: true,
                      });
                  }}
                >
                  <FormField
                    control={editTripForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Any description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormOptionalSection>
              </NextStepViewport>
              <Separator />

              <FormField
                control={editTripForm.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-1 flex-col"
                    id={getTourStepSelector(
                      TourNames.TripDetailsTour,
                      "StartDate",
                    )}
                  >
                    <FormLabel>Start Date</FormLabel>
                    <DateTimePicker
                      value={field.value ?? new Date()}
                      hideTimezone
                      granularity="day"
                      className="w-full"
                      onChange={(date) => {
                        editTripForm.setValue("startDate", date ?? new Date(), {
                          shouldDirty: true,
                        });
                      }}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editTripForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem
                    id={getTourStepSelector(
                      TourNames.TripDetailsTour,
                      "Picture",
                    )}
                  >
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <ImageInput
                        className="h-[200px] w-[300px] rounded-md"
                        onChange={(value) => field.onChange(value)}
                        imageUrl={field.value?.url}
                        maxSizePicture={20}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton
                className="w-fit self-end"
                disabled={!editTripForm.formState.isDirty}
                id={getTourStepSelector(TourNames.TripDetailsTour, "Submit")}
              >
                Save
              </SubmitButton>
            </CardFooter>
          </>
        )}
      </Card>
    </Form>
  );
};
