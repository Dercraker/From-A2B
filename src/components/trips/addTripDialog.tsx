"use client";

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
import { contactSupportAction } from "@/features/contact/support/contact-support.action";
import { ContactSupportSchemaType } from "@/features/contact/support/contact-support.schema";
import { AddTripSchema } from "@/features/trip/addTrip.schema";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type AddTripDialogProps = PropsWithChildren;

export const AddTripDialog = (props: AddTripDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddTripSchema,
    defaultValues: {},
  });

  const onSubmit = async (values: ContactSupportSchemaType) => {
    const result = await contactSupportAction(values);

    if (!result?.data) {
      toast.error(result?.serverError);
      return;
    }

    toast.success("Your message has been sent.");
    form.reset();
    setOpen(false);
  };

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
          onSubmit={async (v) => onSubmit(v)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  {/* //TODO: https://shadcn-calendar-component.vercel.app/ */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
