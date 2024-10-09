import { TripsListDtoSchema } from "@/features/trips/dto/tripsListDto.schema";
import { GetTripsByCurrentOrgQuery } from "@/features/trips/getTripsByCurrentOrgQuery.query";
import { EmptyTrips } from "./_components/emptyTrips";
import { TripsContainer } from "./_components/tripsContainer";

export default async function RoutePage() {
  const trips: TripsListDtoSchema = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
  });

  if (!trips || !trips.length) return <EmptyTrips />;

  return <TripsContainer trips={trips} />;
}
