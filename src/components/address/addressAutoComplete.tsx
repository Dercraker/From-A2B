"use client";

import type { AddressType } from "@feat/address/address.schema";
import { AddressByPlaceIdAction } from "@feat/address/addressByPlaceId.action";
import { ADDRESS_KEY_FACTORY } from "@feat/address/addressKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@ui/skeleton";
import { InlineTooltip } from "@ui/tooltip";
import { Delete, Search } from "lucide-react";
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
          {address.displayName || address.formattedAddress ? (
            <div className="flex w-full flex-col">
              <Input
                value={
                  address.displayName
                    ? `${address.displayName}, ${address.formattedAddress}`
                    : address.formattedAddress
                }
                readOnly
              />
            </div>
          ) : (
            <Skeleton className="h-8 w-56" />
          )}

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
              <InlineTooltip title="Address details">
                <Search className="size-4" />
              </InlineTooltip>
            </Button>
          </AddressDialog>
          <Button
            type="reset"
            onClick={() => {
              setSelectedPlaceId("");
              setAddress({
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
          showInlineError={showInlineError}
          placeholder={placeholder}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
