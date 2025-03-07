"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@components/ui/command";
import { Input } from "@components/ui/input";
import {
  CmdOrOption,
  KeyboardShortcut,
} from "@components/ui/keyboard-shortcut";
import { Typography } from "@components/ui/typography";
import { LINKS } from "@feat/navigation/Links";
import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import type { TripsListDtoSchema } from "@feat/trips/dto/tripsListDto.schema";
import { SearchTripsAction } from "@feat/trips/searchTrips.action";
import { useDebounce } from "@hooks/use-debounce";
import { useDisclosure } from "@hooks/useDisclosure";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { IconPlaneArrival, IconPlaneDeparture } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import type { OrgPathParams } from "@type/next";
import { format, isBefore } from "date-fns";
import { HistoryIcon, PlaneIcon, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useKey } from "react-use";
import { getOrganizationNavigation } from "./orgNavigation.links";

export const OrganizationCommand = () => {
  const [isOpen, { open, close, toggle }] = useDisclosure(false);
  const { orgSlug } = useParams<OrgPathParams>();
  const router = useRouter();

  const down = () => toggle();

  useKey(
    (event) => (event.ctrlKey || event.metaKey) && event.key === "k",
    down,
    {
      event: "keydown",
      options: {
        capture: true,
      },
    },
  );

  const [searchQuery, SetSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchedTrips } = useQuery({
    queryKey: TRIP_KEY_Factory.search(debouncedSearchQuery),
    queryFn: async () => {
      const result = await SearchTripsAction({
        searchQuery: debouncedSearchQuery,
      });

      if (!isActionSuccessful(result)) throw new Error(result?.serverError);
      return result.data as TripsListDtoSchema;
    },
    staleTime: 0,
  });

  return (
    <>
      <div className="relative w-full max-w-[200px] md:w-2/3 lg:w-1/3">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full appearance-none bg-background pl-8 shadow-none"
          onClick={() => {
            open();
          }}
        />

        <div className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-5 select-none items-center gap-1">
          <KeyboardShortcut eventKey="cmd">
            <CmdOrOption />
          </KeyboardShortcut>
          <KeyboardShortcut eventKey="k">K</KeyboardShortcut>
        </div>
      </div>
      <CommandDialog open={isOpen} onOpenChange={toggle}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchQuery}
          onChangeCapture={(e) => SetSearchQuery(e.currentTarget.value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {getOrganizationNavigation(orgSlug, []).map((link, idx) => (
            <CommandGroup heading={link.title} key={idx}>
              {link.links.map(({ href, label, Icon }) => (
                <CommandItem
                  key={href}
                  onSelect={() => {
                    close();
                    router.push(href);
                  }}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  <span>{label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Trips">
            {searchedTrips?.map((trip) => (
              <CommandItem
                key={trip.id}
                onSelect={() => {
                  close();
                  router.push(
                    LINKS.Trips.Trip.href({ orgSlug, tripSlug: trip.slug }),
                  );
                }}
              >
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row">
                    {isBefore(trip.startDate, new Date()) && <HistoryIcon />}
                    <PlaneIcon />
                  </div>
                  <Typography className="capitalize">{trip.name}</Typography>
                  <Typography className="flex flex-row gap-2 underline underline-offset-2">
                    <IconPlaneDeparture />
                    {format(trip.startDate, "yyyy/MM/dd")}
                  </Typography>
                  {trip.endDate !== trip.startDate && (
                    <Typography className="flex flex-row gap-2 underline underline-offset-2">
                      <IconPlaneArrival />
                      {format(trip.endDate, "yyyy/MM/dd")}
                    </Typography>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
