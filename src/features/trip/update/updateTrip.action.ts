"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { EditTripSchema } from "./editTrip.schema";
import { UpdateTripQuery } from "./updateTrip.query";

export const UpdateTripAction = orgAction
  .schema(EditTripSchema)
  .action(async ({ parsedInput }) => {
    return UpdateTripQuery({ data: parsedInput });
  });
