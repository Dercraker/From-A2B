"use client";

import { PoiMarkers } from "@/components/map/poiMarkers";
import type { Poi, Pois } from "@/features/map/poi.type";
import { useTripStore } from "@/features/trip/trip.store";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
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
  tripId: string;
  tripSlug: string;
  orgSlug: string;
};

export const TripMap = ({
  className,
  orgSlug,
  tripId,
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
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            logger.debug(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom,
            )
          }
          gestureHandling={"greedy"}
          minZoom={3}
        >
          <MapControl position={ControlPosition.RIGHT_TOP}>
            <CenterMapButton />
          </MapControl>
          <PoiMarkers pois={poi} />
          {/* //TODO: Implement me https://github.com/visgl/react-google-maps/blob/main/examples/geometry/src/components/polyline.tsx */}
        </Map>
      </div>
      <RoadsPath tripSlug={tripSlug} />
    </>
  );
};
