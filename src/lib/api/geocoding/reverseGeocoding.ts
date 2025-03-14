import { env } from "@lib/env/server";

export const reverseGeoCoding = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${env.GOOGLE_GEOCODING_API_KEY}&result_type=street_address`,
    {
      headers: {
        "X-Goog-FieldMask":
          "id,adrFormatAddress,displayName,shortFormattedAddress,formattedAddress,location,addressComponents",
      },
    },
  );
  return response.json();
};
