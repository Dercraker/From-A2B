import type { TripsListDtoSchema } from "@/features/trips/dto/tripsListDto.schema";
import { GetTripsByCurrentOrgQuery } from "@/features/trips/getTripsByCurrentOrgQuery.query";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
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
        lt: new Date(),
      },
    },
  });

  if (!trips.length) return <TravelHistoryEmpty orgSlug={orgSlug} />;

  return <TripsContainer trips={trips} />;
};

export default RoutePage;
