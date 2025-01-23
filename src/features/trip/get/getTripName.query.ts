import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { TripNameDtoSchema } from "./dto/tripNameDto.schema";

type GetTripNameProps = {
  where: Prisma.TripWhereUniqueInput;
};

export const GetTripNameQuery = async ({ where }: GetTripNameProps) => {
  const trip = await prisma.trip.findUnique({
    where,
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });

  return TripNameDtoSchema.parse(trip);
};
