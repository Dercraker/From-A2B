"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { z } from "zod";
import { SearchTripsQuery } from "./searchTripsQuery.query";

const SearchTripsSchema = z.object({ searchQuery: z.string() });

export const SearchTripsAction = orgAction
  .schema(SearchTripsSchema)
  .action(async ({ parsedInput: { searchQuery } }) => {
    const trips = await SearchTripsQuery({
      searchQuery,
    });

    return trips;
  });
