"use server";

import { LINKS } from "@feat/navigation/Links";
import { orgAction } from "@lib/actions/safe-actions";
import { uploadTripPicture } from "@lib/blobStorage/uploadFile";
import { generateSlug } from "@lib/format/id";
import { UpdateTripQuery } from "../update/updateTrip.query";
import { AddTripQuery } from "./addTrip.query";
import { AddTripSchema } from "./addTrip.schema";

export const AddTripAction = orgAction
  .schema(AddTripSchema)
  .action(async ({ parsedInput, ctx }) => {
    const slug = await AddTripQuery({
      ...parsedInput,
      slug: generateSlug(parsedInput.name),
      endDate: parsedInput.startDate,
      Organization: {
        connect: {
          id: ctx.org.id,
        },
      },
      image: undefined,
    });

    let image;
    if (parsedInput.image?.file) {
      image = await uploadTripPicture({
        file: parsedInput.image?.file,
        userId: ctx.user.id,
        entityId: slug,
      });
    }

    if (image) {
      await UpdateTripQuery({
        data: {
          image: image.url,
        },
        where: {
          slug,
        },
      });
    }
    return LINKS.Trips.Trip.href({
      orgSlug: ctx.org.slug,
      tripSlug: slug,
    });
  });
