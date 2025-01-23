import type { TripsListDtoSchema } from "@/features/trips/dto/tripsListDto.schema";
import { GetTripsByCurrentOrgQuery } from "@/features/trips/getTripsByCurrentOrgQuery.query";
import { combineWithParentMetadata } from "@/lib/metadata";
import { EmptyTrips } from "./_components/emptyTrips";
import { TripsContainer } from "./_components/tripsContainer";

export const generateMetadata = combineWithParentMetadata({
  title: "Trips",
  description: "List of your trips.",
});
export default async function RoutePage() {
  const trips: TripsListDtoSchema = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
  });

  if (!trips.length) return <EmptyTrips />;

  return <TripsContainer trips={trips} />;
}
