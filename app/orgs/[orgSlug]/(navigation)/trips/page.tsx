import type { TripsListDtoSchema } from "@feat/trips/dto/tripsListDto.schema";
import { GetTripsByCurrentOrgQuery } from "@feat/trips/getTripsByCurrentOrgQuery.query";
import { combineWithParentMetadata } from "@lib/metadata";
import { startOfDay } from "date-fns";
import { EmptyTrips } from "./_components/emptyTrips";
import { TripsContainer } from "./_components/tripsContainer";

export const generateMetadata = combineWithParentMetadata({
  title: "Trips",
  description: "List of your trips",
});

const RoutePage = async () => {
  const trips: TripsListDtoSchema = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
    where: {
      startDate: {
        gte: startOfDay(new Date()),
      },
    },
  });

  if (!trips.length) return <EmptyTrips />;

  return <TripsContainer trips={trips} />;
};

export default RoutePage;
