"use server";

import { authAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { RemoveVerificationTokenQuery } from "./RemoveVerificationToken.query";

const RemoveVerificationTokenSchema = z.object({ token: z.string() });

export const RemoveVerificationTokenAction = authAction
  .schema(RemoveVerificationTokenSchema)
  .action(async ({ parsedInput: { token } }) => {
    await RemoveVerificationTokenQuery({ where: { token } });
  });
