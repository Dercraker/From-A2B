"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetTripQuery } from "./getTrip.query";

const GetTripActionSchema = z.object({
  tripSlug: z.string(),
});

export const GetTripAction = orgAction
  .schema(GetTripActionSchema)
  .action(async ({ parsedInput: { tripSlug } }) => {
    const trip = await GetTripQuery({
      where: {
        slug: tripSlug,
      },
    });

    return trip;
  });
