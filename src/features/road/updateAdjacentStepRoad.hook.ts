"use client";

import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateAdjacentMovedStepRoadActionAction } from "./updateAdjacentStepRoad.action";

type useUpdateAdjacentStepRoadProps = {
  tripSlug: string;
};

export const useUpdateAdjacentStepRoad = ({
  tripSlug,
}: useUpdateAdjacentStepRoadProps) => {
  const queryClient = useQueryClient();

  const { data, error, isPaused, mutateAsync, isSuccess } = useMutation({
    mutationFn: async ({ stepId }: { stepId: string }) => {
      const result = await UpdateAdjacentMovedStepRoadActionAction({
        stepId,
      });

      if (!isActionSuccessful(result))
        return toast.error(
          "An error has occurred in updating the itineraries.",
          {
            description: "Please try again later or contact support",
          },
        );
      await queryClient.invalidateQueries({
        queryKey: TRIP_KEY_Factory.roads(tripSlug),
      });
      return toast.success("Updated itineraries");
    },
  });

  return { data, error, isPaused, mutateAsync, isSuccess };
};
