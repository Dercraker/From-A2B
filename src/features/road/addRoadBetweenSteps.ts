import { GetStepQuery } from "@feat/steps/get/getStep.query";
import { GetStepAfterQuery } from "@feat/steps/get/getStepAfter.query";
import { GetStepBeforeQuery } from "@feat/steps/get/getStepBefore.query";
import { ComputeRoutes } from "@lib/api/routes/computeRoutes";
import { GetTransportModeFromString } from "@utils/getTravelMode";
import { AddRoadToStepQuery } from "./addRoadToStepQuery";
import { UpdateRoadToStepByIdQuery } from "./updateRoadToStepById.query";

type addRoadBetweenStepsRoadProps = {
  stepId: string;
};

/**
 * Permet de mettre a jours les routes entre les step N-1 N et N+1 quand la step N est ajouter entre N-1 et N+1
 *
 * @param stepId Id de la step N
 *
 * @description Avec le schema `A -> R1 -> C`
 *
 * A est Step N-1, C est Step N+1
 *
 * R1 est la route entre A et C
 *
 * Quand Step B soit N est ajouter de la sorte : `A -> B -> C`
 *
 * La fonction mets a jour les routes R1 et R2 selon ce schema `A -> R1 -> B -> R2 -> C`
 */
export const AddRoadsToStep = async ({
  stepId,
}: addRoadBetweenStepsRoadProps) => {
  const stepBefore = await GetStepBeforeQuery({ id: stepId });
  const currentStep = await GetStepQuery({
    where: {
      id: stepId,
    },
  });
  const stepAfter = await GetStepAfterQuery({ id: stepId });

  if (!currentStep) throw new Error("Step n'est pas définie ");

  if (stepBefore && !stepAfter) {
    const road = await ComputeRoutes({
      origin: {
        placeId: stepBefore.placeId,
        location: {
          latLng: {
            latitude: Number(stepBefore.latitude),
            longitude: Number(stepBefore.longitude),
          },
        },
      },
      destination: {
        placeId: currentStep.placeId,
        location: {
          latLng: {
            latitude: Number(currentStep.latitude),
            longitude: Number(currentStep.longitude),
          },
        },
      },
      TransportMode: GetTransportModeFromString(currentStep.TransportMode),
    });

    await AddRoadToStepQuery({
      data: {
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
  }

  if (!stepBefore && stepAfter) {
    const road = await ComputeRoutes({
      origin: {
        placeId: currentStep.placeId,
        location: {
          latLng: {
            latitude: Number(currentStep.latitude),
            longitude: Number(currentStep.longitude),
          },
        },
      },
      destination: {
        placeId: stepAfter.placeId,
        location: {
          latLng: {
            latitude: Number(stepAfter.latitude),
            longitude: Number(stepAfter.longitude),
          },
        },
      },
      TransportMode: GetTransportModeFromString(stepAfter.TransportMode),
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
            id: stepAfter.tripId,
          },
        },
      },
    });
  }

  if (!stepBefore || !stepAfter) return;

  const prevRoad = await ComputeRoutes({
    origin: {
      placeId: stepBefore.placeId,
      location: {
        latLng: {
          latitude: Number(stepBefore.latitude),
          longitude: Number(stepBefore.longitude),
        },
      },
    },
    destination: {
      placeId: currentStep.placeId,
      location: {
        latLng: {
          latitude: Number(currentStep.latitude),
          longitude: Number(currentStep.longitude),
        },
      },
    },
    TransportMode: GetTransportModeFromString(currentStep.TransportMode),
  });

  const nextRoad = await ComputeRoutes({
    origin: {
      placeId: currentStep.placeId,
      location: {
        latLng: {
          latitude: Number(currentStep.latitude),
          longitude: Number(currentStep.longitude),
        },
      },
    },
    destination: {
      placeId: stepAfter.placeId,
      location: {
        latLng: {
          latitude: Number(stepAfter.latitude),
          longitude: Number(stepAfter.longitude),
        },
      },
    },
    TransportMode: GetTransportModeFromString(stepAfter.TransportMode),
  });

  await AddRoadToStepQuery({
    data: {
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
    stepId: stepAfter.id as string,
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
          id: stepAfter.tripId,
        },
      },
    },
  });
};
