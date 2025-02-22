import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type UpdateRoadToStepByIdQueryProps = {
  stepId: string;
  data: Prisma.RoadUpdateInput;
};

export const UpdateRoadToStepByIdQuery = async ({
  data,
  stepId,
}: UpdateRoadToStepByIdQueryProps) => {
  const road = await prisma.road.update({
    where: {
      stepId,
    },
    data,
  });

  return road;
};
