import { GetRequiredUser } from "@lib/auth/helper";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
export async function getUsersOrgs() {
  const user = await GetRequiredUser();
  const userOrganizations = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      image: true,
    },
  });

  return userOrganizations;
}

export type GetUsersOrgsQuery = Prisma.PromiseReturnType<typeof getUsersOrgs>;
