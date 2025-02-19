"use client";

import { ADDRESS_KEY_FACTORY } from "@feat/address/addressKey.factory";
import { SearchPlacesAction } from "@feat/places/searchPlaces.action";
import { useDebounce } from "@hooks/use-debounce";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "../ui/command";
import { FormMessage } from "../ui/form";
import { Skeleton } from "../ui/skeleton";
import { Typography } from "../ui/typography";

type AddressAutoCompleteInputProps = {
  selectedPlaceId: string;
  setSelectedPlaceId: (placeId: string) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
  showInlineError?: boolean;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  placeholder?: string;
  isLoading: boolean;
};

export const AddressAutoCompleteInput = ({
  searchInput,
  selectedPlaceId,
  setIsOpenDialog,
  setSearchInput,
  setSelectedPlaceId,
  placeholder,
  showInlineError,
  isLoading,
}: AddressAutoCompleteInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      close();
    }
  };

  const debouncedSearchInput = useDebounce(searchInput, 500);

  const { data, isPending, refetch } = useQuery({
    queryKey: ADDRESS_KEY_FACTORY.AutoComplete(debouncedSearchInput),
    queryFn: async () => {
      const res = await SearchPlacesAction({ textQuery: debouncedSearchInput });
      if (!isActionSuccessful(res)) {
        toast.error(res?.serverError ?? "Failed to fetch places");
        return [];
      }

      return res.data;
    },
    enabled: !!debouncedSearchInput,
  });

  useEffect(() => {
    if (!debouncedSearchInput || debouncedSearchInput === "") return;
    void refetch();
  }, [debouncedSearchInput]);

  const predictions = data ?? [];

  return (
    <Command
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      className="overflow-visible"
    >
      {isLoading ? (
        <div className="flex w-full items-center justify-between rounded-lg border bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <Skeleton className="h-10 w-full rounded-lg p-3" />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between rounded-lg border bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <CommandPrimitive.Input
            value={searchInput}
            onValueChange={setSearchInput}
            onBlur={close}
            onFocus={open}
            placeholder={placeholder ?? "Enter place"}
            className="w-full rounded-lg p-3 outline-none"
          />
        </div>
      )}
      {searchInput !== "" && !isOpen && !selectedPlaceId && showInlineError && (
        <FormMessage>Select a valid address from the list</FormMessage>
      )}

      {isOpen && (
        <div className="relative h-auto animate-in fade-in-0 zoom-in-95">
          <CommandList>
            <div className="absolute top-1.5 z-50 w-full ">
              <CommandGroup className="relative z-50 h-72 min-w-32 overflow-scroll rounded-md border bg-background shadow-md">
                {isPending ? (
                  <div className="flex h-28 items-center justify-center">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {predictions.map(
                      ({ name, formattedAddress, displayName }) => (
                        <CommandPrimitive.Item
                          value={formattedAddress}
                          onSelect={() => {
                            setSelectedPlaceId(name);
                            setIsOpenDialog(true);
                          }}
                          className="flex h-max cursor-pointer select-text flex-col items-start gap-0.5 rounded-md p-2 px-3 hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                          key={`${name}`}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <div className="flex flex-col">
                            {displayName && (
                              <Typography>{displayName}</Typography>
                            )}
                            <Typography
                              className={cn(
                                displayName &&
                                  "leading-3 text-muted-foreground underline",
                              )}
                            >
                              {formattedAddress}
                            </Typography>
                          </div>
                        </CommandPrimitive.Item>
                      ),
                    )}
                  </>
                )}

                <CommandEmpty>
                  {!isPending && predictions.length === 0 && (
                    <div className="flex items-center justify-center py-4">
                      {searchInput === ""
                        ? "Please enter an place"
                        : "No address found"}
                    </div>
                  )}
                </CommandEmpty>
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      )}
    </Command>
  );
};
