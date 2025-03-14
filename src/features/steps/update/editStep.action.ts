"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { EditStepQuery } from "./editStep.query";
import { EditStepSchema } from "./editStep.schema";

export const EditStepAction = orgAction
  .metadata({ roles: ["ADMIN"] })
  .schema(EditStepSchema)
  .action(
    async ({
      parsedInput: {
        TransportMode,
        endDate,
        latitude,
        stepId,
        longitude,
        name,
        startDate,
        tripSlug,
        description,
        placeId,
      },
    }) => {
      const editStep = await EditStepQuery({
        where: {
          id: stepId,
        },
        step: {
          name,
          latitude,
          longitude,
          startDate,
          endDate,
          description,
          placeId: placeId ?? undefined,
          TransportMode,
          trip: {
            connect: {
              slug: tripSlug,
            },
          },
        },
      });

      return editStep;
    },
  );
