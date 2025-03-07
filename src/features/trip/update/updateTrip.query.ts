import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type UpdateTripQueryType = {
  where: Prisma.TripWhereUniqueInput;
  data: Prisma.TripUpdateInput;
};

export const UpdateTripQuery = async ({ data, where }: UpdateTripQueryType) => {
  return prisma.trip.update({
    where,
    data,
  });
};
