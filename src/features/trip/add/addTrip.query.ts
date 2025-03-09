import { TripSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

export const AddTripQuery = async (params: Prisma.TripCreateInput) => {
  const { slug } = await prisma.trip.create({
    data: {
      ...params,
    },
    select: { slug: true },
  });

  return TripSchema.parseAsync(slug);
};

export type AddTripQuery = Prisma.PromiseReturnType<typeof AddTripQuery>;
