"use client";

import type { AddressType } from "@/features/address/address.schema";
import { AddressByPlaceIdAction } from "@/features/address/addressByPlaceId.action";
import { ADDRESS_KEY_FACTORY } from "@/features/address/addressKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { Delete, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  isLoading: boolean;
};

export default function AddressAutoComplete({
  address,
  dialogTitle,
  searchInput,
  setAddress,
  setSearchInput,
  placeholder,
  showInlineError = true,
  isLoading,
}: AddressAutoCompleteProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ADDRESS_KEY_FACTORY.PlaceId(selectedPlaceId),
    queryFn: async () => {
      if (!selectedPlaceId) return;
      const res = await AddressByPlaceIdAction({ placeId: selectedPlaceId });
      if (!isActionSuccessful(res)) {
        toast.error(res?.serverError ?? "Failed to fetch place");
        return;
      }

      return res.data;
    },
    enabled: !!selectedPlaceId,
  });

  useEffect(() => {
    if (!selectedPlaceId) return;

    void refetch();
  }, [selectedPlaceId]);

  const adrAddress = data?.formattedAddress ?? "";

  useEffect(() => {
    if (data) {
      setAddress(data as AddressType);
    }
  }, [data, setAddress]);

  return (
    <>
      {selectedPlaceId !== "" || address.formattedAddress ? (
        <div className="flex items-center gap-2">
          <Input value={address.formattedAddress} readOnly />

          <AddressDialog
            isLoading={isPending ?? isLoading}
            dialogTitle={dialogTitle}
            adrAddress={adrAddress}
            address={address}
            setAddress={setAddress}
            open={isOpen}
            setOpen={setIsOpen}
          >
            <Button
              disabled={isPending ?? isLoading}
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
          isLoading={isLoading}
        />
      )}
    </>
  );
}
