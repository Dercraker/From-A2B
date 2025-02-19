"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetTripRoadsQuery } from "./getTripRoads.query";

const GetTripRoadSchema = z.object({
  tripSlug: z.string(),
});

export const GetTripRoadAction = orgAction
  .schema(GetTripRoadSchema)
  .action(async ({ parsedInput: { tripSlug }, ctx }) => {
    const roads = GetTripRoadsQuery({
      where: {
        slug: tripSlug,
      },
    });

    return roads;
  });
