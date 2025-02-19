import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

export const AddTripQuery = async (params: Prisma.TripCreateInput) => {
  const { slug } = await prisma.trip.create({
    data: {
      ...params,
    },
    select: { slug: true },
  });

  return slug;
};

export type AddTripQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddTripQuery>
>;
