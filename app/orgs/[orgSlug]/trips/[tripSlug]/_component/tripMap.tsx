"use client";

import { PoiMarkers } from "@components/map/poiMarkers";
import type { Poi, Pois } from "@feat/map/poi.type";
import { useTripStore } from "@feat/trip/trip.store";
import { cn } from "@lib/utils";
import {
  ControlPosition,
  Map,
  MapControl,
  RenderingType,
} from "@vis.gl/react-google-maps";
import { useMemo, type ComponentPropsWithoutRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { CenterMapButton } from "./centerMapButton";
import { RoadsPath } from "./RoadsPath";

export type TripMapProps = ComponentPropsWithoutRef<"div"> & {
  tripSlug: string;
  orgSlug: string;
};

export const TripMap = ({
  className,
  orgSlug,
  tripSlug,
  ...props
}: TripMapProps) => {
  const { steps } = useTripStore(useShallow((s) => s));

  const poi: Pois = useMemo(() => {
    if (!steps) return [] satisfies Pois;

    return steps.map(
      (step) =>
        ({
          key: step.name,
          location: {
            lat: step.latitude,
            lng: step.longitude,
          },
        }) satisfies Poi,
    ) satisfies Pois;
  }, [steps]);

  return (
    <>
      <div className={cn("", className)} {...props}>
        <Map
          reuseMaps
          renderingType={RenderingType.VECTOR}
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          mapId={"a18fd5fb0c24af78"}
          gestureHandling={"greedy"}
          minZoom={3}
        >
          <MapControl position={ControlPosition.RIGHT_TOP}>
            <CenterMapButton />
          </MapControl>
          <PoiMarkers pois={poi} />
          <RoadsPath tripSlug={tripSlug} />
        </Map>
      </div>
    </>
  );
};
