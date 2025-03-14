import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type DeleteManyVerificationTokenQueryProps = {
  where: Prisma.VerificationTokenWhereInput;
};

export const DeleteManyVerificationTokenQuery = async ({
  where,
}: DeleteManyVerificationTokenQueryProps) =>
  prisma.verificationToken.deleteMany({
    where,
  });

export type DeleteManyVerificationTokenQuery = Prisma.PromiseReturnType<
  typeof DeleteManyVerificationTokenQuery
>;
