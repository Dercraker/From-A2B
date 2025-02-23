"use client";

import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STEP_KEY_FACTORY } from "./stepKey.factory";
import type { ReSortStepsSchema } from "./update/reSortStep.schema";
import { ReSortStepsAction } from "./update/reSortSteps.action";

type useResortStepsProps = {
  tripSlug: string;
};

export const useResortSteps = ({ tripSlug }: useResortStepsProps) => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync, isSuccess } = useMutation({
    mutationFn: async ({ steps }: ReSortStepsSchema) => {
      const result = await ReSortStepsAction({
        steps,
      });

      if (!isActionSuccessful(result))
        return toast.error("Failed to reorder steps", {
          description: "Please try again later or contact support",
        });
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(tripSlug),
      });
      return toast.success("Steps reordered successfully");
    },
  });

  return { data, error, isPending, mutateAsync, isSuccess };
};
