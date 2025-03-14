import { TripSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

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

  return z
    .array(TripSchema)
    .parse(trips.map((trip) => ({ ...trip, orgSlug: org.slug })));
};

export type SearchTripsQuery = Prisma.PromiseReturnType<
  typeof SearchTripsQuery
>;
