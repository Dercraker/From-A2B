import { prisma } from "@/lib/prisma";
import { EditTrip } from "./editTrip.schema";

type UpdateTripQueryType = {
  data: EditTrip;
};

export const UpdateTripQuery = async ({ data }: UpdateTripQueryType) => {
  return await prisma.trip.update({
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
