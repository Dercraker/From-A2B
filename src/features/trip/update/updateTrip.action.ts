"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { uploadTripPicture } from "@lib/blobStorage/uploadFile";
import { GetTripPictureQuery } from "../get/getTripPicture.query";
import { EditTripSchema } from "./editTrip.schema";
import { UpdateTripQuery } from "./updateTrip.query";

export const UpdateTripAction = orgAction
  .schema(EditTripSchema)
  .action(async ({ parsedInput: { tripSlug, ...data }, ctx }) => {
    let newPicturePath = undefined;

    if (data.image?.file) {
      const oldPicturePath =
        (await GetTripPictureQuery({
          where: { slug: tripSlug },
        })) ?? undefined;

      newPicturePath = await uploadTripPicture({
        file: data.image?.file,
        userId: ctx.user.id,
        entityId: tripSlug,
        oldPicturePath,
      });
    }

    return UpdateTripQuery({
      where: {
        slug: tripSlug,
      },
      data: {
        ...data,
        image: newPicturePath?.url,
      },
    });
  });
