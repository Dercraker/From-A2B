"use client";

import { PropsWithChildren } from "react";

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
import { AddStepAction } from "@/features/steps/add/addStep.action";
import { AddStepSchema } from "@/features/steps/add/addStep.schema";
import { STEP_KEY_FACTORY } from "@/features/steps/stepKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { TransportMode } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bike, Car, Footprints, Plane, Sailboat } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AutocompleteComponent } from "../address/autocompleteComponent";
import { LoadingButton } from "../form/LoadingButton";
import { CalendarDatePicker } from "../ui/calendar-date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Typography } from "../ui/typography";
import { StepDto } from "@/features/steps/dto/stepDto.schema";

export type AddStepDialogProps = PropsWithChildren<{
  beforeStep?: StepDto;
  afterStep?: StepDto;
}>;

export const AddStepDialog = ({
  children,
  beforeStep,
  afterStep,
}: AddStepDialogProps) => {
  const params = useParams();
  const [open, setOpen] = useState(false);

  const form = useZodForm({
    schema: AddStepSchema,
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      TransportMode: TransportMode.Car,
      tripSlug: String(params.tripSlug),

      stepAfterId: beforeStep,
      stepBeforeId: afterStep,
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

      return result.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(params.tripSlug.toString()),
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
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
          onSubmit={() => {}}
          className="flex flex-col gap-4"
          onReset={() => {
            setOpen(false);
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

          <FormField
            control={form.control}
            name="startDate"
            render={() => (
              <FormItem>
                <FormLabel>Dates of step</FormLabel>
                <FormControl>
                  <CalendarDatePicker
                    date={{
                      from: form.getValues().startDate ?? undefined,
                      to: form.getValues().endDate ?? undefined,
                    }}
                    onDateSelect={(v) => {
                      form.setValue("startDate", v.from);
                      form.setValue("endDate", v.to);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              onClick={async () => await addStepAsync(form.getValues())}
              loading={isPending}
            >
              Add new step
            </LoadingButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
