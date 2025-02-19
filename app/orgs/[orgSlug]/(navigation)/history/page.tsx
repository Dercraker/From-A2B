import type { TripsListDtoSchema } from "@feat/trips/dto/tripsListDto.schema";
import { GetTripsByCurrentOrgQuery } from "@feat/trips/getTripsByCurrentOrgQuery.query";
import { combineWithParentMetadata } from "@lib/metadata";
import type { PageParams } from "@type/next";
import { startOfDay } from "date-fns";
import { TripsContainer } from "../trips/_components/tripsContainer";
import { TravelHistoryEmpty } from "./_components/TravelHistoryEmpty";

export const generateMetadata = combineWithParentMetadata({
  title: "Travel history",
  description: "Travel history",
});

const RoutePage = async ({ params }: PageParams<{ orgSlug: string }>) => {
  const orgSlug = (await params).orgSlug;

  const trips: TripsListDtoSchema = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
    where: {
      startDate: {
        lt: startOfDay(new Date()),
      },
    },
  });

  if (!trips.length) return <TravelHistoryEmpty orgSlug={orgSlug} />;

  return <TripsContainer trips={trips} />;
};

export default RoutePage;
