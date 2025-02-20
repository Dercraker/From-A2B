"use server";

import { UpdateRoadToStepByIdQuery } from "@feat/road/updateRoadToStepById.query";
import { orgAction } from "@lib/actions/safe-actions";
import { ComputeRoutes } from "@lib/api/routes/computeRoutes";
import { GetTransportModeFromString } from "@utils/getTravelMode";
import { z } from "zod";
import { GetStepAfterQuery } from "../get/getStepAfter.query";
import { GetStepBeforeQuery } from "../get/getStepBefore.query";
import { DeleteStepQuery } from "./deleteStep.query";

const DeleteStepSchema = z.object({
  stepId: z.string(),
});

export const DeleteStepAction = orgAction
  .schema(DeleteStepSchema)
  .action(async ({ parsedInput: { stepId } }) => {
    const stepBefore = await GetStepBeforeQuery({ id: stepId });
    const stepAfter = await GetStepAfterQuery({ id: stepId });
    await DeleteStepQuery({
      where: {
        id: stepId,
      },
    });

    if (stepBefore && stepAfter) {
      const road = await ComputeRoutes({
        origin: {
          placeId: stepBefore.placeId,
          location: {
            latLng: {
              latitude: stepBefore.latitude,
              longitude: stepBefore.longitude,
            },
          },
        },
        destination: {
          placeId: stepAfter.placeId,
          location: {
            latLng: {
              latitude: stepAfter.latitude,
              longitude: stepAfter.longitude,
            },
          },
        },
        transportMode: GetTransportModeFromString(stepAfter.transportMode),
      });
      await UpdateRoadToStepByIdQuery({
        stepId: stepAfter.id,
        data: {
          ...road,
        },
      });
    }
  });
