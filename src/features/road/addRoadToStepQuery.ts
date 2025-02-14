import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type AddRoadToStepQueryProps = {
  data: Prisma.RoadCreateInput;
};

export const AddRoadToStepQuery = async ({ data }: AddRoadToStepQueryProps) => {
  const road = await prisma.road.create({
    data,
  });

  return road;
};
