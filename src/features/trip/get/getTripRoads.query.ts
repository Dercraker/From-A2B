import { RoadSchema } from "@generated/modelSchema";
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

  return RoadSchema.array().parseAsync(trip?.Road);
};

export type GetTripRoadsQuery = Prisma.PromiseReturnType<
  typeof GetTripRoadsQuery
>;
