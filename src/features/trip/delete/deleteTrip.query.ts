import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import type { DeleteTripSchema } from "./deleteTrip.schema";

export const DeleteTripQuery = async ({ orgId, tripId }: DeleteTripSchema) => {
  await prisma.trip.update({
    where: {
      id: tripId,
      organizationId: orgId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export type DeleteTripQuery = Prisma.PromiseReturnType<typeof DeleteTripQuery>;
