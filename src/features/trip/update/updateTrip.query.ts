import { prisma } from "@lib/prisma";
import type { EditTrip } from "./editTrip.schema";

type UpdateTripQueryType = {
  data: EditTrip;
};

export const UpdateTripQuery = async ({ data }: UpdateTripQueryType) => {
  return prisma.trip.update({
    where: {
      id: data.tripId,
    },
    data: {
      name: data.name,
      startDate: data.startDate,
      description: data.description,
      image: data.image,
    },
  });
};
