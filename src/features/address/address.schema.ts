import { z } from "zod";

export const AddressSchema = z.object({
  address1: z.string(),
  address2: z.string(),
  formattedAddress: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
  placeId: z.string().nullable(),
});

export type AddressType = z.infer<typeof AddressSchema>;
