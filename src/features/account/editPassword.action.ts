"use server";

import { ActionError, authAction } from "@lib/actions/safe-actions";
import {
  hashStringWithSalt,
  validatePassword,
} from "@lib/auth/credentials-provider";
import { GetRequiredUser } from "@lib/auth/helper";
import { env } from "@lib/env/server";
import { prisma } from "@lib/prisma";
import { EditPasswordFormSchema } from "./email/editProfile.schema";

export const editPasswordAction = authAction
  .schema(EditPasswordFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const user = await GetRequiredUser();
    const { passwordHash } = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        passwordHash: true,
      },
    });

    if (input.newPassword !== input.confirmPassword) {
      throw new ActionError("Passwords do not match");
    }

    if (
      hashStringWithSalt(input.currentPassword, env.NEXTAUTH_SECRET) !==
      passwordHash
    ) {
      throw new ActionError("Invalid current password");
    }

    if (!validatePassword(input.newPassword)) {
      throw new ActionError(
        "Invalid new password. Must be at least 8 characters, and contain at least one letter and one number",
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        passwordHash: hashStringWithSalt(
          input.newPassword,
          env.NEXTAUTH_SECRET,
        ),
      },
      select: {
        id: true,
      },
    });

    return updatedUser;
  });
