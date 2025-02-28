import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { addHours } from "date-fns";
import { nanoid } from "nanoid";

type CreateVerificationTokenQueryProps = {
  data: Partial<Prisma.VerificationTokenCreateInput>;
};

export const CreateVerificationTokenQuery = async ({
  data,
}: CreateVerificationTokenQueryProps) => {
  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: "",
      expires: addHours(new Date(), 24),
      token: nanoid(),
      ...data,
    },
  });

  return verificationToken;
};
