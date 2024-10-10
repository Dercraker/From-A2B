"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenerateTripLink } from "@/features/trips/trips.link";
import { SiteConfig } from "@/site-config";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type TripsSelectProps = {
  currentTripSlug?: string;
  orgSlug: string;
  children?: ReactNode;
  trips: {
    slug: string;
    name: string;
    image: string | null;
  }[];
};

export const TripSelect = ({
  currentTripSlug,
  orgSlug,
  trips,
  children,
}: TripsSelectProps) => {
  const router = useRouter();
  return (
    <Select
      value={currentTripSlug}
      onValueChange={(value) => {
        router.push(GenerateTripLink({ orgSlug, tripSlug: value }));
      }}
    >
      <SelectTrigger className="h-8 justify-start gap-2 border-none bg-transparent px-4 hover:bg-accent [&>span]:flex [&>svg]:hidden hover:[&>svg]:block">
        {children ? children : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        {trips.map((trip) => (
          <SelectItem key={trip.slug} value={trip.slug} className="h-fit">
            <span className="inline-flex h-full items-center gap-1">
              <Avatar className="size-6">
                <AvatarFallback>
                  {trip.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
                {trip.image ? <AvatarImage src={trip.image} /> : null}
              </Avatar>
              <span className="line-clamp-1 text-left">{trip.name}</span>
            </span>
          </SelectItem>
        ))}
        {!SiteConfig.features.enableSingleMemberOrg ? (
          <SelectItem value="new">Add a new organization</SelectItem>
        ) : null}
      </SelectContent>
    </Select>
  );
};
