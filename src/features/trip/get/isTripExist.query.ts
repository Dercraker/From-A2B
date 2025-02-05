import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type IsTripExistQueryProps = {
  where: Prisma.TripWhereInput;
};

export const IsTripExistQuery = async ({
  where,
}: IsTripExistQueryProps): Promise<boolean> =>
  !!(await prisma.trip.findFirst({
    where,
  }));
