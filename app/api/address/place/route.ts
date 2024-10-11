import { AddressType } from "@/features/address/address.schema";
import { env } from "@/lib/env/server";
import { authRoute } from "@/lib/safe-route";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = authRoute
  .params(z.object({ placeId: z.string() }))
  .handler(async (req, { params }) => {
    if (!env.GOOGLE_PLACES_API_KEY)
      return NextResponse.json({ error: "Missing API Key", data: null });

    const url = `https://places.googleapis.com/v1/${params.placeId}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            // Include expected fields in the response
            "adrFormatAddress,shortFormattedAddress,formattedAddress,location,addressComponents",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const dataFinderRegx = (c: string) => {
        const regx = new RegExp(`<span class="${c}">([^<]+)<\/span>`);
        const match = data.adrFormatAddress.match(regx);
        return match ? match[1] : "";
      };

      const address1 = dataFinderRegx("street-address");
      const address2 = "";
      const city = dataFinderRegx("locality");
      const region = dataFinderRegx("region");
      const postalCode = dataFinderRegx("postal-code");
      const country = dataFinderRegx("country-name");
      const lat = data.location.latitude;
      const lng = data.location.longitude;
      const placeId = data.placeId;

      const formattedAddress = data.formattedAddress;

      const formattedData: AddressType = {
        address1,
        address2,
        formattedAddress,
        city,
        region,
        postalCode,
        country,
        lat,
        lng,
        placeId,
      };
      return NextResponse.json({
        data: {
          address: formattedData,
          adrAddress: data.adrFormatAddress,
        },
        error: null,
      });
    } catch (err) {
      console.error("Error fetching place details:", err);
      return NextResponse.json({ error: err, data: null });
    }
  });
