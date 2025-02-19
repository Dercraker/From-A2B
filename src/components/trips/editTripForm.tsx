"use client";

import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Typography } from "@components/ui/typography";
import type { TripDto } from "@feat/trip/get/dto/tripDto.schema";
import { TripDtoSchema } from "@feat/trip/get/dto/tripDto.schema";
import { GetTripAction } from "@feat/trip/get/getTrip.action";
import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import type { EditTrip } from "@feat/trip/update/editTrip.schema";
import { EditTripSchema } from "@feat/trip/update/editTrip.schema";
import { UpdateTripAction } from "@feat/trip/update/updateTrip.action";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { cn } from "@lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitButton } from "../form/SubmitButton";
import { ImageFormItem } from "../images/ImageFormItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateTimePicker } from "../ui/DateTimePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "../ui/form";

export type EditTripFormProps = {
  tripSlug: string;
  className?: string;
};

export const EditTripForm = ({ tripSlug, className }: EditTripFormProps) => {
  const editTripForm = useZodForm({
    schema: EditTripSchema,
    defaultValues: {
      startDate: new Date(),
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isPending: isTripPending } = useQuery({
    queryKey: TRIP_KEY_Factory.byId(tripSlug),
    queryFn: async () => {
      const result = await GetTripAction({ tripSlug });
      if (!isActionSuccessful(result)) {
        throw new Error("Failed to fetch trip. Please try again later.");
      }

      editTripForm.setValue("tripId", result.data.id);
      editTripForm.setValue("name", result.data.name);
      editTripForm.setValue("startDate", result.data.startDate);
      editTripForm.setValue("description", result.data.description);
      editTripForm.setValue("image", result.data.image);

      return result.data as TripDto;
    },
  });

  const { mutate: UpdateTrip } = useMutation({
    mutationFn: async (values: EditTrip) => {
      const result = await UpdateTripAction(values);
      if (!isActionSuccessful(result)) {
        logger.error("Failed to update trip");
        toast.error("Failed to update trip. Please try again later.");
      }

      await queryClient.invalidateQueries({
        queryKey: TRIP_KEY_Factory.byId(tripSlug),
      });
      toast.success("Trip updated successfully");
      editTripForm.reset(result?.data);
      router.refresh();
    },
  });

  const handleResetForm = (data: TripDto) => {
    editTripForm.reset(data);
  };

  if (isTripPending) return <Typography>Loading...</Typography>;
  return (
    <Form
      onSubmit={(formValues) => UpdateTrip(formValues)}
      onReset={() => {
        handleResetForm(TripDtoSchema.parse(data));
      }}
      form={editTripForm}
    >
      {/* <Card> */}
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle>
            <FormField
              control={editTripForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline gap-2">
                    <FormLabel>
                      <Typography variant="h3">Title</Typography>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="My trip to London..." />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardTitle>
          <CardDescription>
            <FormField
              control={editTripForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={editTripForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Start Date</FormLabel>
                <DateTimePicker
                  value={field.value ?? new Date()}
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
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <ImageFormItem
                    className="h-[200px] w-[300px] rounded-md"
                    onChange={(url) => field.onChange(url)}
                    imageUrl={field.value}
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
          >
            Save
          </SubmitButton>
        </CardFooter>
      </Card>
    </Form>
  );
};
