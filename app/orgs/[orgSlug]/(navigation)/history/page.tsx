import { GetTripsByCurrentOrgQuery } from "@feat/trips/getTripsByCurrentOrgQuery.query";
import type { Trip } from "@generated/modelSchema";
import { combineWithParentMetadata } from "@lib/metadata";
import type { OrgPathParams, PageParams } from "@type/next";
import { startOfDay } from "date-fns";
import { TripsContainer } from "../trips/_components/tripsContainer";
import { TravelHistoryEmpty } from "./_components/TravelHistoryEmpty";

export const generateMetadata = combineWithParentMetadata({
  title: "Travel history",
  description: "Travel history",
});

const RoutePage = async ({ params }: PageParams<OrgPathParams>) => {
  const orgSlug = (await params).orgSlug;

  const trips: Trip[] = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
    where: {
      startDate: {
        lt: startOfDay(new Date()),
      },
    },
  });

  if (trips.length) return <TripsContainer trips={trips} orgSlug={orgSlug} />;
  return <TravelHistoryEmpty orgSlug={orgSlug} />;
};

export default RoutePage;
