import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type DeleteRoadToStepQueryProps = { where: Prisma.RoadWhereUniqueInput };

export const DeleteRoadToStepQuery = async ({
  where,
}: DeleteRoadToStepQueryProps) => {
  await prisma.road.delete({
    where,
  });
};

export type DeleteRoadToStepQuery = Prisma.PromiseReturnType<
  typeof DeleteRoadToStepQuery
>;
