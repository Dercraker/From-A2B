"use server";

import { AddRoadsToStep } from "@feat/road/addRoadBetweenSteps";
import { ActionError, orgAction } from "@lib/actions/safe-actions";
import { generateSlug } from "@lib/format/id";
import { GetStepRank } from "@utils/GetStepRank";
import type { StepDto } from "../dto/stepDto.schema";
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

      let newStep: StepDto;

      try {
        const newRank = GetStepRank({
          previousRank:
            stepBefore?.rank ??
            (stepAfter ? otherStep?.rank : lastTripStep?.rank),
          nextRank: stepAfter?.rank ?? otherStep?.rank,
        });

        newStep = await AddStepQuery({
          step: {
            name,
            slug: generateSlug(name),
            latitude,
            longitude,
            startDate,
            endDate,
            description,
            placeId,
            TransportMode,
            trip: {
              connect: {
                slug: tripSlug,
              },
            },
            rank: newRank,
          },
        });
      } catch (e) {
        await ReorderAllStepQuery({ tripSlug });
        return new ActionError(
          "An error occurred while adding the step, please try again",
        );
      }

      try {
        await AddRoadsToStep({ stepId: newStep.id });
      } catch (error) {
        return new ActionError("An error occurred while adding road to step");
      }

      return newStep.name;
    },
  );
