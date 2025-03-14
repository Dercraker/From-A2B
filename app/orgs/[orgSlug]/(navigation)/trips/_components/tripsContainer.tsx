import type { Trip } from "@generated/modelSchema";
import { TripCard } from "./tripCard";

export type TripsContainerProps = {
  trips: Trip[];
  orgSlug: string;
};

export const TripsContainer = ({ trips, orgSlug }: TripsContainerProps) => {
  return (
    <div className="flex w-full flex-wrap  gap-4 max-lg:flex-col max-lg:items-center">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} orgSlug={orgSlug} />
      ))}
    </div>
  );
};
