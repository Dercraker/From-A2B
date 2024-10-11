"use client";

import { AddressType } from "@/features/address/address.schema";
import { useEffect, useState } from "react";
import AddressAutoComplete from "./addressAutoComplete";

type AutocompleteComponentProps = {
  onChange: (address: AddressType) => void;
};

export const AutocompleteComponent = ({
  onChange,
}: AutocompleteComponentProps) => {
  const [address, setAddress] = useState<AddressType>({
    address1: "",
    address2: "",
    formattedAddress: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    lat: 0,
    lng: 0,
    placeId: "",
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
      dialogTitle="Enter Address"
    />
  );
};
