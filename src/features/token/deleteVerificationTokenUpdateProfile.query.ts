import { DeleteManyVerificationTokenQuery } from "./deleteManyVerificationToken.query";

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
