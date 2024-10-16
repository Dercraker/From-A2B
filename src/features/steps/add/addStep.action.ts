"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { getMiddleRank } from "@/utils/getMiddleRank";
import { GetLastStepQueryByTripId } from "../get/getLastStep.query";
import { AddStepQuery } from "./addStep.query";
import { AddStepSchema } from "./addStep.schema";

export const AddStepAction = orgAction
  .schema(AddStepSchema)
  .action(
    async ({
      parsedInput: {
        TransportMode,
        endDate,
        latitude,
        longitude,
        name,
        startDate,
        tripSlug,
        description,
        placeId,
        stepAfter,
        stepBefore,
      },
      ctx,
    }) => {
      const lastTripStep = await GetLastStepQueryByTripId({
        tripId: tripSlug,
      });

      const newRank = getMiddleRank(
        stepBefore?.rank ?? undefined,
        stepAfter?.rank ?? lastTripStep?.rank,
      );

      const newStep = await AddStepQuery({
        step: {
          name,
          latitude,
          longitude,
          startDate,
          endDate,
          description,
          placeId,
          transportMode: TransportMode,
          trip: {
            connect: {
              slug: tripSlug,
            },
          },
          rank: newRank,
        },
      });

      return newStep.name;
    },
  );
