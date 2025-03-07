"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { uploadTripPicture } from "@lib/blobStorage/uploadFile";
import { generateSlug } from "@lib/format/id";
import { GenerateTripLink } from "../../trips/trips.link";
import { UpdateTripQuery } from "../update/updateTrip.query";
import { AddTripQuery } from "./addTrip.query";
import { AddTripSchema } from "./addTrip.schema";

export const AddTripAction = orgAction
  .schema(AddTripSchema)
  .action(async ({ parsedInput, ctx }) => {
    const tripSlug = await AddTripQuery({
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
        entityId: tripSlug,
      });
    }

    if (image) {
      await UpdateTripQuery({
        data: {
          image: image.url,
        },
        where: {
          slug: tripSlug,
        },
      });
    }
    return GenerateTripLink({ orgSlug: ctx.org.slug, tripSlug });
  });
