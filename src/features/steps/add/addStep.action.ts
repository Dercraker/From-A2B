"use server";

import { AddRoadToStepQuery } from "@feat/road/addRoadToStepQuery";
import { UpdateRoadToStepByIdQuery } from "@feat/road/updateRoadToStepById.query";
import { ActionError, orgAction } from "@lib/actions/safe-actions";
import { ComputeRoutes } from "@lib/api/routes/computeRoutes";
import { generateSlug } from "@lib/format/id";
import { GetStepRank } from "@utils/GetStepRank";
import { GetTransportModeFromString } from "@utils/getTravelMode";
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
      console.log("🚀 ~ stepBefore:", stepBefore);
      console.log("🚀 ~ stepAfter:", stepAfter);

      const otherStep = stepBefore
        ? await GetStepAfterQuery({ id: stepBefore.id })
        : stepAfter
          ? await GetStepBeforeQuery({ id: stepAfter.id })
          : null;
      console.log("🚀 ~ otherStep:", otherStep);

      const lastTripStep = await GetLastStepQueryByTripSlug({
        tripSlug,
      });
      console.log("🚀 ~ lastTripStep:", lastTripStep);

      //#region Compute Road
      let road;
      let nextRoad;

      if (stepBefore) {
        road = await ComputeRoutes({
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
        console.log("🚀 ~ in stepBefore -> road:", road);

        const nextStep = await GetStepAfterQuery({
          id: stepBefore.id,
        });
        console.log("🚀 ~ nextStep:", nextStep);
        if (nextStep)
          nextRoad = await ComputeRoutes({
            origin: {
              placeId: placeId,
              location: {
                latLng: {
                  latitude: latitude,
                  longitude: longitude,
                },
              },
            },
            destination: {
              placeId: nextStep.placeId,
              location: {
                latLng: {
                  latitude: nextStep.latitude,
                  longitude: nextStep.longitude,
                },
              },
            },
            transportMode: GetTransportModeFromString(nextStep.transportMode),
          });
        console.log("🚀 ~ in stepBefore -> nextRoad:", nextRoad);
      } else if (stepAfter) {
        nextRoad = await ComputeRoutes({
          origin: {
            placeId: placeId,
            location: {
              latLng: {
                latitude,
                longitude,
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
        console.log("🚀 ~ in step after nextRoad:", nextRoad);

        const prevStep = await GetStepBeforeQuery({
          id: stepAfter.id,
        });
        console.log("🚀 ~ prevStep:", prevStep);
        if (prevStep)
          road = await ComputeRoutes({
            origin: {
              placeId: prevStep.placeId,
              location: {
                latLng: {
                  latitude: prevStep.latitude,
                  longitude: prevStep.longitude,
                },
              },
            },
            destination: {
              placeId: placeId,
              location: {
                latLng: {
                  latitude: latitude,
                  longitude: longitude,
                },
              },
            },
            transportMode,
          });
        console.log("🚀 ~ in step after road:", road);
      } else if (lastTripStep) {
        road = await ComputeRoutes({
          origin: {
            placeId: lastTripStep.placeId,
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
        console.log("🚀 ~ lastTripStep:", lastTripStep);
        console.log("🚀 ~ road:", road);
      }

      //#endregion Compute Road

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

        //#region RoadUpdate

        if ((lastTripStep || stepBefore) && road)
          await AddRoadToStepQuery({
            data: {
              distance: road.distance ?? 0,
              duration: road.duration ?? 0,
              polyline: road.polyline ?? "",
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

        if (stepAfter && nextRoad)
          await UpdateRoadToStepByIdQuery({
            stepId: stepAfter.id,
            data: {
              distance: nextRoad.distance ?? 0,
              duration: nextRoad.duration ?? 0,
              polyline: nextRoad.polyline ?? "",
            },
          });

        //#endregion RoadUpdate

        return newStep.name;
      } catch {
        await ReorderAllStepQuery({ tripSlug });
        return new ActionError(
          "An error occurred while adding the step, please try again",
        );
      }
    },
  );
