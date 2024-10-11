"use client";

import { AddressType } from "@/features/address/address.schema";
import { useQuery } from "@tanstack/react-query";
import { Delete, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddressAutoCompleteInput } from "./addressAutoCompleteInput";
import AddressDialog from "./addressDialog";

type AddressAutoCompleteProps = {
  address: AddressType;
  setAddress: (address: AddressType) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  dialogTitle: string;
  showInlineError?: boolean;
  placeholder?: string;
};

export default function AddressAutoComplete({
  address,
  dialogTitle,
  searchInput,
  setAddress,
  setSearchInput,
  placeholder,
  showInlineError = true,
}: AddressAutoCompleteProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["place", selectedPlaceId],
    queryFn: async () => {
      if (!selectedPlaceId) return;
      const response = await fetch(
        `/api/address/place?placeId=${selectedPlaceId}`,
      );
      return response.json();
    },
    enabled: !!selectedPlaceId,
  });

  useEffect(() => {
    if (!selectedPlaceId) return;

    refetch();
  }, [selectedPlaceId]);

  const adrAddress = data?.data.adrAddress;

  useEffect(() => {
    if (data?.data.address) {
      setAddress(data.data.address as AddressType);
    }
  }, [data, setAddress]);

  return (
    <>
      {selectedPlaceId !== "" || address.formattedAddress ? (
        <div className="flex items-center gap-2">
          <Input value={address?.formattedAddress} readOnly />

          <AddressDialog
            isLoading={isPending}
            dialogTitle={dialogTitle}
            adrAddress={adrAddress}
            address={address}
            setAddress={setAddress}
            open={isOpen}
            setOpen={setIsOpen}
          >
            <Button
              disabled={isPending}
              size="icon"
              variant="outline"
              className="shrink-0"
            >
              <Pencil className="size-4" />
            </Button>
          </AddressDialog>
          <Button
            type="reset"
            onClick={() => {
              setSelectedPlaceId("");
              setAddress({
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
            }}
            size="icon"
            variant="outline"
            className="shrink-0"
          >
            <Delete className="size-4" />
          </Button>
        </div>
      ) : (
        <AddressAutoCompleteInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedPlaceId={selectedPlaceId}
          setSelectedPlaceId={setSelectedPlaceId}
          setIsOpenDialog={setIsOpen}
          showInlineError={showInlineError}
          placeholder={placeholder}
        />
      )}
    </>
  );
}
