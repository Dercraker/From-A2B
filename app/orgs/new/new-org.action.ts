"use server";

import { createOrganizationQuery } from "@/features/org/org-create.query";
import { authAction } from "@/lib/actions/safe-actions";
import { NewOrgsSchema } from "./new-org.schema";

export const createOrganizationAction = authAction
  .schema(NewOrgsSchema)
  .action(async ({ parsedInput, ctx }) => {
    const org = await createOrganizationQuery({
      slug: parsedInput.slug,
      name: parsedInput.name,
      email: parsedInput.email,
      members: {
        create: {
          userId: ctx.user.id,
          roles: ["OWNER"],
        },
      },
    });

    return org;
  });
