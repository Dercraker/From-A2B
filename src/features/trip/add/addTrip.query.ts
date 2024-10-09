import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const AddTripQuery = async (params: Prisma.TripCreateInput) => {
  const { id: tripId } = await prisma.trip.create({
    data: {
      ...params,
    },
    select: { id: true },
  });

  return tripId;
};

export type AddTripQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddTripQuery>
>;
