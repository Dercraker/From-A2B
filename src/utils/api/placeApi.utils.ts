import { env } from "@/lib/env/server";
import { PlacesClient } from "@googlemaps/places";

const placeClient = new PlacesClient({
  apiKey: env.GOOGLE_PLACES_API_KEY,
});

export const getPlaces = async (input: string, regionCode: string[]) =>
  await placeClient.autocompletePlaces({
    input,
    includedPrimaryTypes: [
      "street_address",
      "subpremise",
      "route",
      "street_number",
      "landmark",
    ],
    includedRegionCodes: regionCode,
  });
