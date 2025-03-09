import { VerificationTokenSchema } from "@generated/modelSchema";
import type { Prisma } from "@prisma/client";
import { addHours } from "date-fns";
import { nanoid } from "nanoid";
import { CreateVerificationTokenQuery } from "./createVerificationToken.query";
type CreateUpdateProfileVerificationTokenQueryProps = { newEmail: string };

export const CreateUpdateProfileVerificationTokenQuery = async ({
  newEmail,
}: CreateUpdateProfileVerificationTokenQueryProps) => {
  const verificationToken = await CreateVerificationTokenQuery({
    data: {
      identifier: `${newEmail}-update-profile`,
      expires: addHours(new Date(), 1),
      token: nanoid(6),
    },
  });

  return VerificationTokenSchema.parseAsync(verificationToken);
};

export type CreateUpdateProfileVerificationTokenQuery =
  Prisma.PromiseReturnType<typeof CreateUpdateProfileVerificationTokenQuery>;
