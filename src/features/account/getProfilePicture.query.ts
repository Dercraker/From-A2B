import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetProfilePictureQueryProps = { where: Prisma.UserWhereUniqueInput };

export const GetProfilePictureQuery = async ({
  where,
}: GetProfilePictureQueryProps) => {
  const pictureUrl = await prisma.user.findUnique({
    where: {
      ...where,
    },
    select: {
      image: true,
    },
  });

  return pictureUrl?.image;
};

export type GetProfilePictureQuery = Prisma.PromiseReturnType<
  typeof GetProfilePictureQuery
>;
