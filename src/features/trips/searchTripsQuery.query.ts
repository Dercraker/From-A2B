import { prisma } from "@/lib/prisma";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { TripsListDtoSchema } from "./dto/tripsListDto.schema";

type SearchTripsQueryProps = { searchQuery: string };

export const SearchTripsQuery = async ({
  searchQuery,
}: SearchTripsQueryProps) => {
  const { org } = await getRequiredCurrentOrgCache();

  let trips = await prisma.trip.findMany({
    where: {
      organizationId: org.id,
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        // { startDate: { gte: new Date(searchQuery) } },
        // { endDate: { lte: new Date(searchQuery) } },
      ],
      deletedAt: null,
    },
    orderBy: [{ startDate: "asc" }],
    take: 3,
  });

  if (trips.length === 0) {
    trips = await prisma.trip.findMany({
      where: { deletedAt: null },
      orderBy: [{ startDate: "desc" }],
      take: 3,
    });
  }

  return TripsListDtoSchema.parse(trips);
};
