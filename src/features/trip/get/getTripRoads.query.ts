import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTripRoadsQueryProps = { where: Prisma.TripWhereUniqueInput };

export const GetTripRoadsQuery = async ({ where }: GetTripRoadsQueryProps) => {
  const trip = await prisma.trip.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
    include: {
      Road: true,
    },
  });

  return trip?.Road;
};
