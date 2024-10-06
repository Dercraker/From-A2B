import { prisma } from "@/lib/prisma";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import type { Prisma } from "@prisma/client";

export const GetTripsByOrgQuery = async () => {
  const { org } = await getRequiredCurrentOrgCache();
  const trips = await prisma.trip.findMany({
    where: {
      organizationId: org.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return trips;
};

export type GetTripsByOrgQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetTripsByOrgQuery>
>;

export type GetTripByOrg = GetTripsByOrgQuery extends (infer U)[] ? U : never;
