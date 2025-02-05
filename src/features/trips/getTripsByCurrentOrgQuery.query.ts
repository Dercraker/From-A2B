import { prisma } from "@/lib/prisma";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import type { Prisma } from "@prisma/client";
import { TripsListDtoSchema } from "./dto/tripsListDto.schema";

type GetTripsByCurrentOrgQueryProps = {
  order?:
    | Prisma.TripOrderByWithRelationInput
    | Prisma.TripOrderByWithRelationInput[];
  where?: Prisma.TripWhereInput;
};

export const GetTripsByCurrentOrgQuery = async ({
  order,
  where,
}: GetTripsByCurrentOrgQueryProps) => {
  const { org } = await getRequiredCurrentOrgCache();
  const trips = await prisma.trip.findMany({
    where: {
      organizationId: org.id,
      deletedAt: null,
      ...where,
    },
    orderBy: order,
  });

  return TripsListDtoSchema.parse(
    trips.map((trip) => ({ ...trip, orgSlug: org.slug })),
  );
};
