"use server";

import { AddRoadToStepQuery } from "@/features/road/addRoadToStepQuery";
import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { ComputeRoutes } from "@/lib/api/routes/computeRoutes";
import { generateSlug } from "@/lib/format/id";
import { getMiddleRank } from "@/utils/GetStepRank";
import { google } from "@googlemaps/routing/build/protos/protos";
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
          },
          destination: {
            placeId: placeId,
          },
          travelMode: google.maps.routing.v2.RouteTravelMode.DRIVE,
        });

      try {
        const newRank = getMiddleRank({
          previousRank: stepBefore?.rank ?? otherStep?.rank,
          nextRank: stepAfter?.rank ?? otherStep?.rank ?? lastTripStep?.rank,
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
            transportMode: TransportMode,
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
