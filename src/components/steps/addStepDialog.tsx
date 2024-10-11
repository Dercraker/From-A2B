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
import { AddStepSchema } from "@/features/steps/add/addStep.schema";
import { AddTripAction } from "@/features/trip/add/addTrip.action";
import { AddTripSchema } from "@/features/trip/add/addTrip.schema";
import { TransportMode } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AutocompleteComponent } from "../address/autocompleteComponent";
import { LoadingButton } from "../form/LoadingButton";
import { CalendarDatePicker } from "../ui/calendar-date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";

export type AddStepDialogProps = PropsWithChildren;

export const AddStepDialog = ({ children }: AddStepDialogProps) => {
  const [open, setOpen] = useState(true);

  const form = useZodForm({
    schema: AddStepSchema,
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      TransportMode: TransportMode.Car,
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
        {children ? children : <Button variant="filled">Add Trip</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Step</DialogTitle>
          <DialogDescription>
            Fill the form bellow to add a step in your trip.
          </DialogDescription>
        </DialogHeader>
        <Form form={form} onSubmit={() => {}} className="flex flex-col gap-4">
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
                    <SelectItem value={TransportMode.Car}>Car</SelectItem>
                    <SelectItem value={TransportMode.Bike}>Bike</SelectItem>
                    <SelectItem value={TransportMode.Boat}>Boat</SelectItem>
                    <SelectItem value={TransportMode.Walk}>Walk</SelectItem>
                    <SelectItem value={TransportMode.Plane}>Plane</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-2">
            <Button className="flex-1" variant="outline-destructive">
              Reset form
            </Button>
            <LoadingButton className="flex-1" type="submit" loading={isPending}>
              Add new step
            </LoadingButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
