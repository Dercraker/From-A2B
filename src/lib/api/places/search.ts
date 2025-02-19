import { PlacesClient } from "@googlemaps/places";
import { env } from "@lib/env/server";

const placeClient = new PlacesClient({
  apiKey: env.GOOGLE_PLACES_API_KEY,
});

export const SearchPlaces = async (textQuery: string) => {
  const place = await placeClient.searchText(
    {
      textQuery,
    },
    {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location",
        },
      },
    },
  );
  return place;
};
