"use client";

import type { PropsWithChildren } from "react";

import { FormOptionalSection } from "@components/form/FormOptionalSection";
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
import type { StepDto } from "@feat/steps/dto/stepDto.schema";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { EditStepAction } from "@feat/steps/update/editStep.action";
import { EditStepSchema } from "@feat/steps/update/editStep.schema";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { phCapture } from "@lib/postHog/eventCapture";
import { TransportMode } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { StepPathParams } from "@type/next";
import { Separator } from "@ui/separator";
import { Bike, Car, Footprints, Plane, Sailboat } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AutocompleteComponent } from "../address/autocompleteComponent";
import { LoadingButton } from "../form/LoadingButton";
import { DateTimePicker } from "../ui/DateTimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Typography } from "../ui/typography";

export type EditStepDialogProps = PropsWithChildren<{
  step: StepDto;
  onClose: () => void;
}>;

export const EditStepDialog = ({
  children,
  step,
  onClose,
}: EditStepDialogProps) => {
  const { tripSlug } = useParams<StepPathParams>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useZodForm({
    schema: EditStepSchema,
    defaultValues: {
      tripSlug: tripSlug.toString(),
      stepId: step.id,

      name: step.name,
      description: step.description ?? undefined,

      startDate: step.startDate ?? undefined,
      endDate: step.endDate ?? undefined,

      latitude: step.latitude ?? undefined,
      longitude: step.longitude ?? undefined,

      placeId: step.placeId,
      TransportMode: step.TransportMode as TransportMode,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addStepAsync, isPending } = useMutation({
    mutationFn: async (values: EditStepSchema) => {
      const result = await EditStepAction(EditStepSchema.parse(values));
      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      toast.success(`The step ${result.data} as been updated.`);
      form.reset();
      setOpen(false);
      onClose();

      phCapture("EditStep");

      return result.data;
    },
    onSuccess: async () => {
      if (!tripSlug) logger.warn("Invalid TripSlug :", { tripSlug });

      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All((tripSlug ?? "undefined").toString()),
      });
      router.refresh();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onClose();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit step</DialogTitle>
          <DialogDescription>
            Change the value of step bellow.
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubmit={() => {}}
          className="flex flex-col gap-4"
          onReset={() => {
            setOpen(false);
            onClose();
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Go to the airport" {...field} />
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
              form.getValues("endDate") && form.getValues("startDate"),
            )}
            label="Dates"
            onToggle={(open) => {
              if (!open) {
                form.setValue("endDate", undefined);
                form.setValue("startDate", undefined);
              }
            }}
          >
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
          </FormOptionalSection>

          <Separator />

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-muted"
                        placeholder="Select your transport mode to this step"
                      />
                    </SelectTrigger>
                  </FormControl>
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
          <div className="flex justify-between gap-2">
            <Button
              className="flex-1"
              variant="outline-destructive"
              type="reset"
            >
              Cancel
            </Button>
            <LoadingButton
              className="flex-1"
              onClick={async () => addStepAsync(form.getValues())}
              loading={isPending}
            >
              Save edit's
            </LoadingButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
