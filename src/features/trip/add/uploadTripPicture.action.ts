"use server";

import { GetTripPictureQuery } from "@feat/trip/get/getTripPicture.query";
import { orgAction } from "@lib/actions/safe-actions";
import { uploadTripPicture } from "@lib/blobStorage/uploadFile";
import { z } from "zod";

const UploadTripPictureActionSchema = z.object({
  file: z.instanceof(File),
  tripSlug: z.string(),
});

export const UploadTripPictureActionAction = orgAction
  .schema(UploadTripPictureActionSchema)
  .action(async ({ parsedInput: { file, tripSlug }, ctx }) => {
    const pictureUrl = await GetTripPictureQuery({
      where: {
        slug: tripSlug,
      },
    });

    const result = await uploadTripPicture({
      file,
      entityId: tripSlug,
      userId: ctx.user.id,
      oldPicturePath: pictureUrl ?? undefined,
    });

    return { url: result.url };
  });
