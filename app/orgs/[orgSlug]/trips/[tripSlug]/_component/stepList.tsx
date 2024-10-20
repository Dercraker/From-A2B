"use client";

import { AddStepDialog } from "@/components/steps/addStepDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "@/components/ui/typography";
import { LINKS } from "@/features/navigation/Links";
import { StepDto } from "@/features/steps/dto/stepDto.schema";
import { GetAllStepAction } from "@/features/steps/get/getAllStep.action";
import { STEP_KEY_FACTORY } from "@/features/steps/stepKey.factory";
import {
  ReSortStepsAction,
  ReSortStepsSchema,
} from "@/features/steps/update/reSortSteps.action";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { GenerateOrganizationLink } from "../../../(navigation)/_navigation/org-navigation.links";
import { StepItemSortable } from "./stepItemSortable";

export type StepListProps = {
  tripId: string;
  tripSlug: string;
  orgSlug: string;
};

export const StepList = ({ tripId, orgSlug, tripSlug }: StepListProps) => {
  const [steps, SetSteps] = useState<StepDto[] | null | undefined>(undefined);

  const queryClient = useQueryClient();

  const { isPending } = useQuery({
    queryKey: STEP_KEY_FACTORY.All(tripSlug),
    queryFn: async () => {
      const result = await GetAllStepAction({ tripId });
      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch steps. Please try again later.");

        return SetSteps(null);
      }

      SetSteps(result.data.data);
      return result.data.data;
    },
  });

  const { isPending: reSortStepIsPending, mutateAsync: reSortStepAsync } =
    useMutation({
      mutationFn: async ({ steps }: ReSortStepsSchema) => {
        const result = await ReSortStepsAction({ steps });
        if (!isActionSuccessful(result)) {
          return toast.error(
            "Failed to reorder steps. Please try again later.",
          );
        }
      },
      onSuccess: () => {
        toast.success("Steps reordered successfully");
        queryClient.invalidateQueries({
          queryKey: STEP_KEY_FACTORY.All(tripSlug),
        });
      },
    });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id && !!steps) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);

      const newSteps = arrayMove(steps, oldIndex, newIndex);

      SetSteps(newSteps);
      await reSortStepAsync({ steps: newSteps });
    }
  };

  if (isPending)
    return (
      <div className="flex size-full flex-col overflow-hidden border-r lg:w-2/5">
        <div className="flex select-none items-center justify-center gap-2">
          <Typography variant="lead">Loading steps in progress</Typography>
          <Loader className="text-primary" />
        </div>
      </div>
    );

  if (!steps)
    return (
      <div className="flex size-full flex-col overflow-hidden border-r lg:w-2/5">
        <div className="flex select-none flex-col">
          <Typography variant="lead">
            Failed to fetch steps. Please try again later.
          </Typography>
          <Link
            href={GenerateOrganizationLink(
              LINKS.Organization.Trips.href,
              orgSlug,
            )}
            className={buttonVariants({ variant: "outline" })}
          >
            Back to trip list
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex size-full flex-col overflow-hidden border-r lg:w-2/5">
      {!!steps.length && (
        <>
          <ScrollArea className="flex h-full grow">
            {reSortStepIsPending && <LoadingOverlay />}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={async (event) => await handleDragEnd(event)}
            >
              <SortableContext
                items={steps}
                strategy={verticalListSortingStrategy}
              >
                {steps.map((step, idx) => (
                  <StepItemSortable key={step.id} step={step} idx={idx} />
                ))}
              </SortableContext>
            </DndContext>
          </ScrollArea>
          <div className="my-2  flex w-full justify-center px-4">
            <AddStepDialog>
              <Button variant="outline" className="w-full">
                Add new step
              </Button>
            </AddStepDialog>
          </div>
        </>
      )}

      {!steps.length && (
        <div className="mt-4 flex select-none flex-col items-center justify-center">
          <Typography variant="lead">No steps found</Typography>
          <AddStepDialog>
            <Button variant="outline">Add your first Step !</Button>
          </AddStepDialog>
        </div>
      )}
    </div>
  );
};
