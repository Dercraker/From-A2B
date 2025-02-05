import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type RemoveVerificationTokenQueryProps = {
  where: Prisma.Exact<
    Prisma.VerificationTokenWhereUniqueInput,
    Prisma.VerificationTokenWhereUniqueInput
  >;
};

export const RemoveVerificationTokenQuery = async ({
  where,
}: RemoveVerificationTokenQueryProps) => {
  await prisma.verificationToken.delete({
    where,
  });
};
