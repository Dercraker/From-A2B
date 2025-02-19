"use client";

import type { AddressType } from "@feat/address/address.schema";
import { AddressByPlaceIdAction } from "@feat/address/addressByPlaceId.action";
import { AddressByPosGPSAction } from "@feat/address/addressByPosGPS.action";
import { ADDRESS_KEY_FACTORY } from "@feat/address/addressKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddressAutoComplete from "./addressAutoComplete";

type AutocompleteComponentProps = {
  onChange: (address: AddressType) => void;
  lon?: number;
  lat?: number;
  placeId?: string;
};

export const AutocompleteComponent = ({
  onChange,
  lat,
  lon,
  placeId,
}: AutocompleteComponentProps) => {
  const [address, setAddress] = useState<AddressType>({
    address1: "",
    address2: "",
    displayName: null,
    formattedAddress: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    lat: 0,
    lng: 0,
    placeId: "",
  });

  const { isLoading: gpsLoading } = useQuery({
    queryKey: ADDRESS_KEY_FACTORY.GeoCodingPos(Number(lat), Number(lon)),
    queryFn: async () => {
      if (!lat || !lon) throw new Error("No gps position provided");

      const result = await AddressByPosGPSAction({ lat, lng: lon });

      if (!isActionSuccessful(result)) {
        throw new Error(result?.serverError);
      }

      setAddress(result.data);
      return result;
    },
    enabled: !!lat && !!lon && !placeId,
  });
  const { isLoading: placeIdLoading } = useQuery({
    queryKey: ADDRESS_KEY_FACTORY.PlaceId(String(placeId)),
    queryFn: async () => {
      if (!placeId) throw new Error("No placeId provided");

      const result = await AddressByPlaceIdAction({ placeId });

      if (!isActionSuccessful(result)) {
        throw new Error(result?.serverError);
      }

      setAddress(result.data);
      return result;
    },
    enabled: !!placeId && placeId !== "",
  });

  useEffect(() => {
    if (!address) return;

    onChange(address);
  }, [address]);

  const [searchInput, setSearchInput] = useState("");
  return (
    <AddressAutoComplete
      address={address}
      setAddress={setAddress}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      dialogTitle="Enter place"
      isLoading={placeIdLoading || gpsLoading}
    />
  );
};
