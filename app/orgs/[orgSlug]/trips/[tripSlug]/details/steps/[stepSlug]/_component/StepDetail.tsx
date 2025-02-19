"use client";

import { AutocompleteComponent } from "@components/address/autocompleteComponent";
import { FormUnsavedBar } from "@components/form/FormUnsavedBar";
import { DeleteStepAlertDialog } from "@components/steps/deleteStepAlertDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
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
import type { StepDto } from "@feat/steps/dto/stepDto.schema";
import { GetStepBySlugAction } from "@feat/steps/get/getStepBySlug.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { EditStepSchema } from "@feat/steps/update/editStep.schema";
import { ConstructTripLink } from "@feat/trips/trips.link";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { TransportMode } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Bike, Car, Footprints, Plane, Sailboat, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
          ConstructTripLink({
            orgSlug,
            tripSlug,
            href: LINKS.Trips.StepDetail.href,
          }),
        );
        throw new Error("Failed to fetch step. Please try again later");
      }

      form.reset({
        tripSlug: res.data.slug,
        name: res.data.name,
        description: res.data.description ?? undefined,
        startDate: res.data.startDate ?? new Date(),
        endDate: res.data.endDate ?? new Date(),
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        placeId: res.data.placeId,
        transportMode: res.data.transportMode as TransportMode,
      });

      return res.data;
    },
  });

  const handleReset = (data: StepDto) => {
    form.reset({
      tripSlug: data.slug,
      name: data.name,
      description: data.description ?? undefined,
      startDate: data.startDate ?? new Date(),
      endDate: data.endDate ?? new Date(),
      latitude: data.latitude,
      longitude: data.longitude,
      placeId: data.placeId,
      transportMode: data.transportMode as TransportMode,
    });
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <FormUnsavedBar
      onSubmit={(v) => alert(v)}
      onReset={() => handleReset(step)}
      form={form}
    >
      <Card className="group w-full">
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
                  ConstructTripLink({
                    orgSlug,
                    tripSlug,
                    href: LINKS.Trips.StepDetail.href,
                  }),
                )
              }
            >
              <InlineTooltip title="Delete step">
                <Trash2 className="ml-1 hidden cursor-pointer text-red-400 group-hover:block" />
              </InlineTooltip>
            </DeleteStepAlertDialog>
          </CardTitle>
          <CardDescription>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Any description"
                      className="bg-card"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <DateTimePicker
                    value={field.value ?? new Date()}
                    className=" w-full"
                    onChange={(date) => {
                      form.setValue("startDate", date ?? new Date(), {
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
                <FormItem>
                  <FormLabel>End date</FormLabel>
                  <DateTimePicker
                    value={field.value ?? new Date()}
                    className=" w-full"
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
            name="transportMode"
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
