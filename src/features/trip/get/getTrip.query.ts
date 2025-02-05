import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { TripDto } from "./dto/tripDto.schema";
import { TripDtoSchema } from "./dto/tripDto.schema";

type GetTripQueryProps = {
  where: Prisma.TripWhereUniqueInput;
};

export const GetTripQuery = async ({
  where,
}: GetTripQueryProps): Promise<TripDto> => {
  const trip = await prisma.trip.findFirst({
    where,
  });

  return TripDtoSchema.parse(trip);
};
