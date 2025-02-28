"use server";

import { authAction } from "@lib/actions/safe-actions";
import { prisma } from "@lib/prisma";
import { ProfileFormSchema } from "./email/editProfile.schema";

export const updateProfileAction = authAction
  .schema(ProfileFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name: input.name,
        email: input.email,
        image: input.image,
      },
    });

    return user;
  });
