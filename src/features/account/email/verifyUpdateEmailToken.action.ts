"use server";

import { ActionError, authAction } from "@lib/actions/safe-actions";
import { prisma } from "@lib/prisma";
import { z } from "zod";

export const verifyUpdateEmailTokenAction = authAction
  .schema(
    z.object({
      token: z.string(),
      newEmail: z.string(),
    }),
  )
  .action(async ({ parsedInput: { token, newEmail } }) => {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      throw new ActionError("Invalid token");
    }

    if (verificationToken.identifier !== `${newEmail}-update-profile`) {
      throw new ActionError("Invalid token");
    }

    if (verificationToken.expires < new Date()) {
      throw new ActionError("Token expired");
    }

    return {
      valid: true,
    };
  });
