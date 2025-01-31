import { prisma } from "@/lib/prisma";
import { TripListDtoSchema } from "./dto/tripsListDto.schema";

type SearchTripsQueryProps = { searchQuery: string };

export const SearchTripsQuery = async ({
  searchQuery,
}: SearchTripsQueryProps) => {
  let trips = await prisma.trip.findMany({
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        { startDate: { gte: new Date(searchQuery) } },
        { endDate: { lte: new Date(searchQuery) } },
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

  return TripListDtoSchema.parse(trips);
};
