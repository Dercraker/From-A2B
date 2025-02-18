"use server";

import { AddRoadToStepQuery } from "@/features/road/addRoadToStepQuery";
import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { ComputeRoutes } from "@/lib/api/routes/computeRoutes";
import { generateSlug } from "@/lib/format/id";
import { GetStepRank } from "@/utils/GetStepRank";
import { GetLastStepQueryByTripSlug } from "../get/getLastStep.query";
import { GetStepAfterQuery } from "../get/getStepAfter.query";
import { GetStepBeforeQuery } from "../get/getStepBefore.query";
import { ReorderAllStepQuery } from "../update/reorderAllStep.query";
import { AddStepQuery } from "./addStep.query";
import { AddStepSchema } from "./addStep.schema";

export const AddStepAction = orgAction
  .schema(AddStepSchema)
  .action(
    async ({
      parsedInput: {
        transportMode,
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
    }) => {
      if (stepAfter && stepBefore)
        return new ActionError(
          "You must provide only one of stepAfter or stepBefore",
        );

      const otherStep = stepBefore
        ? await GetStepAfterQuery({ id: stepBefore.id })
        : stepAfter
          ? await GetStepBeforeQuery({ id: stepAfter.id })
          : null;

      const lastTripStep = await GetLastStepQueryByTripSlug({
        tripSlug,
      });
      let road;
      if (lastTripStep)
        road = await ComputeRoutes({
          origin: {
            placeId: lastTripStep?.placeId,
            location: {
              latLng: {
                latitude: lastTripStep.latitude,
                longitude: lastTripStep.longitude,
              },
            },
          },
          destination: {
            placeId: placeId,
            location: {
              latLng: {
                latitude,
                longitude,
              },
            },
          },
          transportMode,
        });

      try {
        const newRank = GetStepRank({
          previousRank:
            stepBefore?.rank ??
            (stepAfter ? otherStep?.rank : lastTripStep?.rank),
          nextRank: stepAfter?.rank ?? otherStep?.rank,
        });
        const newStep = await AddStepQuery({
          step: {
            name,
            slug: generateSlug(name),
            latitude,
            longitude,
            startDate,
            endDate,
            description,
            placeId,
            transportMode,
            trip: {
              connect: {
                slug: tripSlug,
              },
            },
            rank: newRank,
          },
        });

        if (lastTripStep && road)
          await AddRoadToStepQuery({
            data: {
              distance: road?.distance ?? 0,
              duration: road?.duration ?? 0,
              polyline: road?.polyline ?? "",
              step: {
                connect: {
                  id: newStep.id,
                },
              },
              trip: {
                connect: {
                  slug: tripSlug,
                },
              },
            },
          });

        return newStep.name;
      } catch {
        await ReorderAllStepQuery({ tripSlug });
        return new ActionError(
          "An error occurred while adding the step, please try again",
        );
      }
    },
  );
