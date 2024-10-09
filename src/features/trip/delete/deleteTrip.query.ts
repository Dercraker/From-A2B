import { prisma } from "@/lib/prisma";
import { DeleteTripSchema } from "./deleteTrip.schema";

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
