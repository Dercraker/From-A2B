import { env } from "@/lib/env/server";
import { PlacesClient } from "@googlemaps/places";

const placeClient = new PlacesClient({
  apiKey: env.GOOGLE_PLACES_API_KEY,
});

export const getPlace = async (placeId: string) => {
  const place = await placeClient.getPlace(
    {
      name: `places/${placeId}`,
    },
    {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "id,adrFormatAddress,shortFormattedAddress,formattedAddress,location,addressComponents",
        },
      },
    },
  );
  return place;
};
