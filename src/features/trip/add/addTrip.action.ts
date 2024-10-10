"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { generateSlug } from "@/lib/format/id";
import { GenerateTripLink } from "../../trips/trips.link";
import { AddTripQuery } from "./addTrip.query";
import { AddTripSchema } from "./addTrip.schema";

export const AddTripAction = orgAction
  .schema(AddTripSchema)
  .action(async ({ parsedInput, ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tripSlug = await AddTripQuery({
      ...parsedInput,
      slug: generateSlug(parsedInput.name),
      endDate: parsedInput.startDate,
      Organization: {
        connect: {
          id: ctx.org.id,
        },
      },
    });

    return GenerateTripLink({ orgSlug: ctx.org.slug, tripSlug });
  });
