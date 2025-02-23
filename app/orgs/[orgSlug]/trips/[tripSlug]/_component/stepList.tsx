"use client";

import { AddStepDialog } from "@components/steps/addStepDialog";
import { Button, buttonVariants } from "@components/ui/button";
import { Loader } from "@components/ui/loader";
import { LoadingOverlay } from "@components/ui/loadingOverlay";
import { ScrollArea } from "@components/ui/scroll-area";
import { Typography } from "@components/ui/typography";
import type { DragEndEvent } from "@dnd-kit/core";
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
import { LINKS } from "@feat/navigation/Links";
import { useUpdateAdjacentStepRoad } from "@feat/road/updateAdjacentStepRoad.hook";
import { GetAllStepAction } from "@feat/steps/get/getAllStep.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import type { ReSortStepsSchema } from "@feat/steps/update/reSortStep.schema";
import { ReSortStepsAction } from "@feat/steps/update/reSortSteps.action";
import { useResortSteps } from "@feat/steps/useResortSteps.hook";
import { useTripStore } from "@feat/trip/trip.store";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMap } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { GenerateOrganizationLink } from "../../../(navigation)/_navigation/org-navigation.links";
import { StepItemSortable } from "./stepItemSortable";

export type StepListProps = {
  tripSlug: string;
  orgSlug: string;
};

export const StepList = ({ orgSlug, tripSlug }: StepListProps) => {
  const { steps, SetSteps } = useTripStore(useShallow((s) => s));
  const map = useMap();
  if (steps?.[steps.length - 1]) {
    map?.setCenter({
      lat: steps[steps.length - 1].latitude,
      lng: steps[steps.length - 1].longitude,
    });
  }

  const queryClient = useQueryClient();

  const { isPending } = useQuery({
    queryKey: STEP_KEY_FACTORY.All(tripSlug),
    queryFn: async () => {
      const result = await GetAllStepAction({ tripSlug });
      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch steps. Please try again later.");

        return SetSteps(null);
      }

      SetSteps(result.data.data);
      return result.data.data;
    },
  });

  const { isPending: reSortStepIsPending, mutateAsync: reSortStepAsync } =
    useResortSteps({ tripSlug });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { mutateAsync: updateRoads } = useUpdateAdjacentStepRoad({ tripSlug });
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && !!steps) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over?.id);

      const newSteps = arrayMove(steps, oldIndex, newIndex);

      SetSteps(newSteps);
      await reSortStepAsync({ steps: newSteps });
      await updateRoads({ stepId: steps[oldIndex].id });
      await updateRoads({ stepId: steps[newIndex].id });
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
              onDragEnd={async (event) => handleDragEnd(event)}
            >
              <SortableContext
                items={steps}
                strategy={verticalListSortingStrategy}
              >
                {steps.map((step, idx) => (
                  <StepItemSortable
                    key={step.id}
                    step={step}
                    idx={idx}
                    orgSlug={orgSlug}
                    tripSlug={tripSlug}
                    className=" h-16  border border-x-0 border-y-2 border-input bg-card px-4 shadow-md shadow-card"
                  />
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
