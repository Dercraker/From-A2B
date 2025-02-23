import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type UpdateRoadToStepByIdQueryProps = {
  stepId: string;
  create: Prisma.RoadCreateInput;
  update: Prisma.RoadUpdateInput;
};

export const UpdateRoadToStepByIdQuery = async ({
  stepId,
  create,
  update,
}: UpdateRoadToStepByIdQueryProps) => {
  const road = await prisma.road.upsert({
    where: {
      stepId,
    },
    update,
    create,
  });

  return road;
};
