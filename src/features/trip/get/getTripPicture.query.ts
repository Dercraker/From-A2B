import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTripPictureQueryProps = { where: Prisma.TripWhereUniqueInput };

export const GetTripPictureQuery = async ({
  where,
}: GetTripPictureQueryProps) => {
  const trip = await prisma.trip.findUnique({
    where,
  });

  return trip?.image;
};

export type GetTripPictureQueryType = Prisma.PromiseReturnType<
  typeof GetTripPictureQuery
>;
