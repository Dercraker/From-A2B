import { z } from "zod";

export const SearchPlacesResponseDtoSchema = z.object({
  name: z.string(),
  displayName: z.string().nullable(),
  formattedAddress: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const SearchPlacesResponsesDtoSchema = z.array(
  SearchPlacesResponseDtoSchema,
);

export type SearchPlacesResponseDto = z.infer<
  typeof SearchPlacesResponseDtoSchema
>;
export type SearchPlacesResponsesDto = z.infer<
  typeof SearchPlacesResponsesDtoSchema
>;
