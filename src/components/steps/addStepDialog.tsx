"use client";

import type { PropsWithChildren } from "react";

import { AutocompleteComponent } from "@components/address/autocompleteComponent";
import { FormOptionalSection } from "@components/form/FormOptionalSection";
import { LoadingButton } from "@components/form/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@components/ui/form";
import { AddStepAction } from "@feat/steps/add/addStep.action";
import { AddStepSchema } from "@feat/steps/add/addStep.schema";
import type { StepDto } from "@feat/steps/dto/stepDto.schema";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import { TransportMode } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/button";
import { DateTimePicker } from "@ui/DateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Separator } from "@ui/separator";
import { Textarea } from "@ui/textarea";
import { Typography } from "@ui/typography";
import { isActionSuccessful } from "lib/actions/actions-utils";
import { Bike, Car, Footprints, Plane, Sailboat } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type AddStepDialogProps = PropsWithChildren<{
  beforeStep?: StepDto;
  afterStep?: StepDto;
  onClose?: () => void;
}>;

export const AddStepDialog = ({
  children,
  beforeStep,
  afterStep,
  onClose,
}: AddStepDialogProps) => {
  const params = useParams();
  const [open, setOpen] = useState(false);

  const form = useZodForm({
    schema: AddStepSchema,
    defaultValues: {
      transportMode: TransportMode.Car,
      tripSlug: String(params.tripSlug),

      stepAfter: afterStep,
      stepBefore: beforeStep,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addStepAsync, isPending } = useMutation({
    mutationFn: async (values: AddStepSchema) => {
      const result = await AddStepAction(AddStepSchema.parse(values));
      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      toast.success(`The step ${result.data} as been added.`);
      form.reset();
      setOpen(false);

      if (onClose) onClose();

      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TRIP_KEY_Factory.roads(params.tripSlug?.toString() as string),
      });
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(params.tripSlug?.toString() as string),
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v && onClose) onClose();
      }}
    >
      <DialogTrigger asChild>
        {children ? children : <Button variant="filled">Add Trip</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Step</DialogTitle>
          <DialogDescription>
            Fill the form bellow to add a step in your trip.
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubmit={() => {}}
          className="flex flex-col gap-4"
          onReset={() => {
            setOpen(false);
            if (onClose) onClose();
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
          <Separator />

          <FormOptionalSection
            label="Dates"
            defaultOpen={Boolean(
              form.getValues("endDate") && form.getValues("startDate"),
            )}
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
                      form.setValue("endDate", date, {
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
            name="latitude"
            render={() => (
              <FormItem>
                <FormLabel>Place</FormLabel>
                <AutocompleteComponent
                  onChange={(address) => {
                    form.setValue("latitude", address.lat);
                    form.setValue("longitude", address.lng);
                    form.setValue("placeId", address.placeId ?? undefined);
                  }}
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
              disabled={!form.formState.isValid}
            >
              Add new step
            </LoadingButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
