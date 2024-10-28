"use server";

import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { SearchPlaces } from "@/lib/api/places/search";
import { z } from "zod";
import { SearchPlacesResponsesDtoSchema } from "./searchPlacesResponse.dto";

const SearchPlacesSchema = z.object({
  textQuery: z.string(),
});

export const SearchPlacesAction = orgAction
  .schema(SearchPlacesSchema)
  .action(async ({ parsedInput: { textQuery } }) => {
    const res = await SearchPlaces(textQuery);
    const data = SearchPlacesResponsesDtoSchema.safeParse(
      res[0].places?.map((p) => ({ ...p, name: p.id })),
    );

    if (!data.success)
      throw new ActionError(
        "Error when searching places, please try again later",
      );
    else
      return SearchPlacesResponsesDtoSchema.parse(
        res[0].places?.map((p) => ({ ...p, name: p.id })),
      );
  });
