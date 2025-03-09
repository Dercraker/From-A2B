import type { Trip } from "@generated/modelSchema";
import { TripSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTripQueryProps = {
  where: Prisma.TripWhereUniqueInput;
};

export const GetTripQuery = async ({
  where,
}: GetTripQueryProps): Promise<Trip> => {
  const trip = await prisma.trip.findFirst({
    where,
  });

  return TripSchema.parseAsync(trip);
};

export type GetTripQuery = Prisma.PromiseReturnType<typeof GetTripQuery>;
