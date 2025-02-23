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
    update: {
      ...road,
    },
    create: {
      ...road,
      step: {
        connect: {
          id: stepAfter.id,
        },
      },
    },
  });
};

type updateAdjacentMovedStepRoadProps = {
  centerStepId: string;
};
/**
 * Permet de mettre la route entre step n-1 et n+1 en cas de déplacement de la step N
 * @param centerStepId Id de la step N
 * @description Avec le schema `A -> R1 -> C -> R2 -> D -> R3 -> B`
 * A est Step N-1, B est Step N et fournis centerStepId, C est Step N+1, D est une step inconnu
 * R1 est la route entre A et C, R2 est la route entre C et D, R3 est la route entre D et B
 *
 * La fonction mettra a jour a step C et B avec deux nouvelles routes qui font A -> R1 -> **B** -> R2 -> D -> R3 -> **C**
 */
export const updateAdjacentMovedStepRoad = async ({
  centerStepId,
}: updateAdjacentMovedStepRoadProps) => {
  const stepBefore = await GetStepBeforeQuery({ id: centerStepId });
  const currentStep = await GetStepQuery({
    where: {
      id: centerStepId,
    },
  });
  const stepAfter = await GetStepAfterQuery({ id: centerStepId });

  if (!currentStep) return;

  if (stepBefore && !stepAfter) {
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
        placeId: currentStep.placeId,
        location: {
          latLng: {
            latitude: currentStep.latitude,
            longitude: currentStep.longitude,
          },
        },
      },
      transportMode: GetTransportModeFromString(currentStep.transportMode),
    });

    await UpdateRoadToStepByIdQuery({
      stepId: currentStep.id,
      update: {
        ...road,
      },
      create: {
        ...road,
        step: {
          connect: {
            id: currentStep.id,
          },
        },
        trip: {
          connect: {
            id: currentStep.tripId,
          },
        },
      },
    });
  } else if (!stepBefore && stepAfter) {
    const road = await ComputeRoutes({
      origin: {
        placeId: currentStep.placeId,
        location: {
          latLng: {
            latitude: currentStep.latitude,
            longitude: currentStep.longitude,
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
      update: {
        ...road,
      },
      create: {
        ...road,
        step: {
          connect: {
            id: stepAfter.id,
          },
        },
        trip: {
          connect: {
            id: currentStep.tripId,
          },
        },
      },
    });

    await DeleteRoadToStepQuery({
      where: {
        stepId: currentStep.id,
      },
    });
  }

  if (!stepBefore || !stepAfter) return;

  const prevRoad = await ComputeRoutes({
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
      placeId: currentStep.placeId,
      location: {
        latLng: {
          latitude: currentStep.latitude,
          longitude: currentStep.longitude,
        },
      },
    },
    transportMode: GetTransportModeFromString(currentStep.transportMode),
  });
  const nextRoad = await ComputeRoutes({
    origin: {
      placeId: currentStep.placeId,
      location: {
        latLng: {
          latitude: currentStep.latitude,
          longitude: currentStep.longitude,
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
    stepId: currentStep.id,
    update: {
      ...prevRoad,
    },
    create: {
      ...prevRoad,
      step: {
        connect: {
          id: currentStep.id,
        },
      },
      trip: {
        connect: {
          id: currentStep.tripId,
        },
      },
    },
  });
  await UpdateRoadToStepByIdQuery({
    stepId: stepAfter.id,
    update: {
      ...nextRoad,
    },
    create: {
      ...nextRoad,
      step: {
        connect: {
          id: stepAfter.id,
        },
      },
      trip: {
        connect: {
          id: currentStep.tripId,
        },
      },
    },
  });
};
