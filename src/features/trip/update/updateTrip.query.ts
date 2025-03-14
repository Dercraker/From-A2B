import { TripSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type UpdateTripQueryType = {
  where: Prisma.TripWhereUniqueInput;
  data: Prisma.TripUpdateInput;
};

export const UpdateTripQuery = async ({ data, where }: UpdateTripQueryType) => {
  const trip = await prisma.trip.update({
    where,
    data,
  });

  return TripSchema.parseAsync(trip);
};

export type UpdateTripQuery = Prisma.PromiseReturnType<typeof UpdateTripQuery>;
