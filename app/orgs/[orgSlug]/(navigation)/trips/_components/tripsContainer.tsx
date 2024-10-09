import { TripsListDtoSchema } from "@/features/trips/dto/tripsListDto.schema";
import { TripCard } from "./tripCard";

export type TripsContainerProps = {
  trips: TripsListDtoSchema;
};

export const TripsContainer = ({ trips }: TripsContainerProps) => {
  return (
    <div className="flex w-full flex-wrap  gap-4 max-lg:flex-col max-lg:items-center">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};
