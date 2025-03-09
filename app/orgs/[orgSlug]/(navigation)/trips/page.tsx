import { GetTripsByCurrentOrgQuery } from "@feat/trips/getTripsByCurrentOrgQuery.query";
import type { Trip } from "@generated/modelSchema";
import { combineWithParentMetadata } from "@lib/metadata";
import type { OrgPathParams, PageParams } from "@type/next";
import { startOfDay } from "date-fns";
import { EmptyTrips } from "./_components/emptyTrips";
import { TripsContainer } from "./_components/tripsContainer";

export const generateMetadata = combineWithParentMetadata({
  title: "Trips",
  description: "List of your trips",
});

const RoutePage = async ({ params }: PageParams<OrgPathParams>) => {
  const orgSlug = (await params).orgSlug;

  const trips: Trip[] = await GetTripsByCurrentOrgQuery({
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

  return <TripsContainer trips={trips} orgSlug={orgSlug} />;
};

export default RoutePage;
