"use client";

import { AutocompleteComponent } from "@components/address/autocompleteComponent";
import { FormOptionalSection } from "@components/form/FormOptionalSection";
import { FormUnsavedBar } from "@components/form/FormUnsavedBar";
import { DeleteStepAlertDialog } from "@components/steps/deleteStepAlertDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { DateTimePicker } from "@components/ui/DateTimePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import { InlineTooltip } from "@components/ui/tooltip";
import { Typography } from "@components/ui/typography";
import { LINKS } from "@feat/navigation/Links";
import { GetStepBySlugAction } from "@feat/steps/get/getStepBySlug.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { EditStepAction } from "@feat/steps/update/editStep.action";
import { EditStepSchema } from "@feat/steps/update/editStep.schema";
import type { Step } from "@generated/modelSchema";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { TransportMode } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@ui/separator";
import { Bike, Car, Footprints, Plane, Sailboat, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StepDetailLoader } from "../_loader/StepDetail.loader";

export type StepDetailProps = {
  stepSlug: string;
  orgSlug: string;
  tripSlug: string;
};

export const StepDetail = ({
  orgSlug,
  stepSlug,
  tripSlug,
}: StepDetailProps) => {
  const rouer = useRouter();

  const form = useZodForm({
    schema: EditStepSchema,
  });

  const {
    data: step,
    isPending,
    error,
  } = useQuery({
    queryKey: STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    queryFn: async () => {
      const res = await GetStepBySlugAction({ stepSlug });
      if (!isActionSuccessful(res)) {
        logger.error("Failed to fetch step.", { stepSlug, res });
        toast.error("Failed to fetch step. Please try again later.");
        rouer.push(
          LINKS.Trips.Steps.StepsList.href({
            orgSlug,
            tripSlug,
          }),
        );
        throw new Error("Failed to fetch step. Please try again later");
      }

      form.reset({
        tripSlug: tripSlug,
        stepId: res.data.id,
        name: res.data.name,
        description: res.data.description ?? undefined,
        startDate: res.data.startDate ?? new Date(),
        endDate: res.data.endDate ?? new Date(),
        latitude: Number(res.data.latitude),
        longitude: Number(res.data.longitude),
        placeId: res.data.placeId,
        TransportMode: res.data.TransportMode as TransportMode,
      });

      return res.data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateStep } = useMutation({
    mutationFn: async (values: EditStepSchema) => {
      const result = await EditStepAction({
        ...values,
        stepId: values.stepId,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      toast.success(`The step ${result.data} as been updated.`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(tripSlug),
      });
    },
  });

  const handleReset = (data: Step) => {
    form.reset({
      tripSlug: data.slug,
      name: data.name,
      description: data.description ?? undefined,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ?? undefined,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      placeId: data.placeId,
      TransportMode: data.TransportMode as TransportMode,
    });
  };

  if (isPending) return <StepDetailLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <FormUnsavedBar
      onSubmit={() => void 0}
      submit={async (v) => {
        updateStep(v);
      }}
      reset={() => handleReset(step)}
      form={form}
    >
      <Card className="group min-h-96 w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="My trip to London..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DeleteStepAlertDialog
              name={step.name}
              stepId={step.id}
              onDeleted={() =>
                rouer.push(
                  LINKS.Trips.Steps.StepsList.href({
                    orgSlug,
                    tripSlug,
                  }),
                )
              }
            >
              <InlineTooltip title="Delete step">
                <Trash2 className="ml-1 hidden cursor-pointer text-red-400 group-hover:block" />
              </InlineTooltip>
            </DeleteStepAlertDialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Separator />

            <FormOptionalSection
              defaultOpen={Boolean(form.getValues("description"))}
              label="Description"
              onToggle={(open) => {
                if (!open) form.setValue("description", undefined);
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

            <FormOptionalSection
              defaultOpen={Boolean(
                !form.getValues("endDate") && !form.getValues("startDate"),
              )}
              label="Dates"
              onToggle={(open) => {
                if (!open) {
                  form.setValue("endDate", undefined, { shouldDirty: true });
                  form.setValue("startDate", undefined, { shouldDirty: true });
                }
              }}
            >
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <DateTimePicker
                        value={field.value}
                        className="w-full"
                        onChange={(date) => {
                          form.setValue("startDate", date, {
                            shouldDirty: true,
                          });
                        }}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel>End Date</FormLabel>
                      <DateTimePicker
                        value={field.value}
                        className="w-full"
                        onChange={(date) => {
                          form.setValue("endDate", date ?? new Date(), {
                            shouldDirty: true,
                          });
                        }}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormOptionalSection>

            <Separator />
          </div>
          <FormField
            control={form.control}
            name="placeId"
            render={() => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <AutocompleteComponent
                  onChange={(address) => {
                    form.setValue("latitude", address.lat);
                    form.setValue("longitude", address.lng);
                    form.setValue("placeId", address.placeId);
                  }}
                  placeId={form.getValues().placeId ?? undefined}
                  lat={form.getValues().latitude}
                  lon={form.getValues().longitude}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TransportMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport Mode</FormLabel>
                <Select {...field}>
                  <SelectTrigger>
                    <FormControl>
                      <SelectValue
                        className="text-muted"
                        placeholder="Select your transport mode to this step"
                      />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransportMode.Car}>
                      <Typography className="flex items-center gap-2">
                        <Car /> Car
                      </Typography>
                    </SelectItem>
                    <SelectItem value={TransportMode.Bike}>
                      <Typography className="flex items-center gap-2">
                        <Bike /> Bike
                      </Typography>
                    </SelectItem>
                    <SelectItem value={TransportMode.Boat}>
                      <Typography className="flex items-center gap-2">
                        <Sailboat /> Boat
                      </Typography>
                    </SelectItem>
                    <SelectItem value={TransportMode.Walk}>
                      <Typography className="flex items-center gap-2">
                        <Footprints /> Walk
                      </Typography>
                    </SelectItem>
                    <SelectItem value={TransportMode.Plane}>
                      <Typography className="flex items-center gap-2">
                        <Plane /> Plane
                      </Typography>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </FormUnsavedBar>
  );
};
