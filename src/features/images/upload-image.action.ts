"use server";

import { GetProfilePictureQuery } from "@feat/account/getProfilePicture.query";
import { authAction } from "@lib/actions/safe-actions";
import { uploadProfilePicture } from "@lib/blobStorage/uploadFile";
import { z } from "zod";

export const uploadImageAction = authAction
  .schema(
    z.object({
      file: z.instanceof(File),
    }),
  )
  .action(async ({ parsedInput: { file }, ctx }) => {
    const pictureUrl = await GetProfilePictureQuery({
      where: {
        id: ctx.user.id,
      },
    });

    const res = await uploadProfilePicture({
      file,
      userId: ctx.user.id,
      oldPicturePath: pictureUrl ?? undefined,
    });
    console.log("🚀 ~ .action ~ res:", res);

    return { url: "https://example.com/image.png" };
  });
