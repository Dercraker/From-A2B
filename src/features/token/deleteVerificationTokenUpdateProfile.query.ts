import { DeleteManyVerificationTokenQuery } from "./deleteManyVerificationToken.query";
import type { Prisma } from "@prisma/client";

type DeleteVerificationTokenUpdateProfileQueryProps = { newEmail: string };

export const DeleteVerificationTokenUpdateProfileQuery = async ({
  newEmail,
}: DeleteVerificationTokenUpdateProfileQueryProps) =>
  DeleteManyVerificationTokenQuery({
    where: {
      identifier: {
        startsWith: `${newEmail}-update-profile`,
      },
    },
  });

export type DeleteVerificationTokenUpdateProfileQuery =
  Prisma.PromiseReturnType<typeof DeleteVerificationTokenUpdateProfileQuery>;
