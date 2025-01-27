"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { reverseGeoCoding } from "@/lib/api/geocoding/reverseGeocoding";
import { z } from "zod";
import type { AddressType } from "./address.schema";

const AddressByPosGPSSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const AddressByPosGPSAction = orgAction
  .schema(AddressByPosGPSSchema)
  .action(async ({ parsedInput: { lat, lng } }) => {
    const result = await reverseGeoCoding(lat, lng);
    const data = result[0];
    const dataFinderRegx = (c: string) => {
      const regx = new RegExp(`<span class="${c}">([^<]+)</span>`);
      const match = data.adrFormatAddress?.match(regx);
      return match ? match[1] : "";
    };

    const address1 = dataFinderRegx("street-address");
    const address2 = "";
    const city = dataFinderRegx("locality");
    const region = dataFinderRegx("region");
    const postalCode = dataFinderRegx("postal-code");
    const country = dataFinderRegx("country-name");

    const formattedAddress = data.formattedAddress;

    const formattedData: AddressType = {
      address1,
      address2,
      formattedAddress: String(formattedAddress),
      city,
      region,
      postalCode,
      country,
      lat: Number(lat),
      lng: Number(lng),
      placeId: null,
    };

    return formattedData;
  });
