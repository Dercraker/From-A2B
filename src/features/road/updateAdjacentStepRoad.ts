import { GetStepQuery } from "@feat/steps/get/getStep.query";
import { GetStepAfterQuery } from "@feat/steps/get/getStepAfter.query";
import { GetStepBeforeQuery } from "@feat/steps/get/getStepBefore.query";
import { ComputeRoutes } from "@lib/api/routes/computeRoutes";
import { GetTransportModeFromString } from "@utils/getTravelMode";
import { DeleteRoadToStepQuery } from "./deleteRoadToStep.query";
import { UpdateRoadToStepByIdQuery } from "./updateRoadToStepById.query";

type updateAdjacentStepRoadProps = { centerStepId: string };

/**
 * Permet de mettre la route entre step n-1 et n+1 en cas de retrais de la step N
 * @param centerStepId Id de la step N
 * @description Avec le schema `A -> R1 -> B -> R2 -> C`
 * A est Step N-1, B est Step N et fournis centerStepId, C est Step N+1
 * R1 est la route entre A et B, R2 est la route entre B et C
 *
 * La fonction mettra a jour a step C avec une nouvelle route R2 qui fait A -> R2 -> C
 */
export const updateAdjacentStepRoad = async ({
  centerStepId,
}: updateAdjacentStepRoadProps) => {
  const stepBefore = await GetStepBeforeQuery({ id: centerStepId });
  const currentStep = await GetStepQuery({
    where: {
      id: centerStepId,
    },
  });
  const stepAfter = await GetStepAfterQuery({ id: centerStepId });

  if (!currentStep) return;

  if (stepBefore && !stepAfter) return;
  else if (!stepBefore && stepAfter) {
    await DeleteRoadToStepQuery({
      where: {
        stepId: stepAfter.id,
      },
    });
  }

  if (!stepBefore || !stepAfter) return;

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
};
