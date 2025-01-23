"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { getPlace } from "@/lib/api/places/placeId";
import { z } from "zod";
import type { AddressType } from "./address.schema";

const AddressByPlaceIdSchema = z.object({
  placeId: z.string(),
});

export const AddressByPlaceIdAction = orgAction
  .schema(AddressByPlaceIdSchema)
  .action(async ({ parsedInput: { placeId } }) => {
    const result = await getPlace(placeId);
    const data = result[0];
    const dataFinderRegx = (c: string) => {
      const regx = new RegExp(`<span class="${c}">([^<]+)<\/span>`);
      const match = data.adrFormatAddress?.match(regx);
      return match ? match[1] : "";
    };

    const address1 = dataFinderRegx("street-address");
    const address2 = "";
    const city = dataFinderRegx("locality");
    const region = dataFinderRegx("region");
    const postalCode = dataFinderRegx("postal-code");
    const country = dataFinderRegx("country-name");
    const lat = data.location?.latitude;
    const lng = data.location?.longitude;

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
      placeId,
    };

    return formattedData;
  });
