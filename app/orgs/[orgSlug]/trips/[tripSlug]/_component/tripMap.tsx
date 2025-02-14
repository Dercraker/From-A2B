"use client";

import { PoiMarkers } from "@/components/map/poiMarkers";
import type { Poi, Pois } from "@/features/map/poi.type";
import { GetTripRoadAction } from "@/features/trip/get/getTripRoads.action";
import { useTripStore } from "@/features/trip/trip.store";
import { TRIP_KEY_Factory } from "@/features/trip/tripKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { decodePolyline } from "@/lib/api/routes/polylinesEncoding";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import {
  ControlPosition,
  Map,
  MapControl,
  RenderingType,
  useMap,
} from "@vis.gl/react-google-maps";
import { useMemo, type ComponentPropsWithoutRef } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { CenterMapButton } from "./centerMapButton";

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
  const map = useMap();

  const { data: roads } = useQuery({
    queryKey: TRIP_KEY_Factory.roads(tripSlug),
    queryFn: async () => {
      const data = await GetTripRoadAction({ tripSlug });

      if (!isActionSuccessful(data)) {
        toast.error("Error when fetching trip roads", {
          description: "please, try again later",
        });
        return null;
      }

      return data;
    },
  });

  const flightPlanCoordinates = roads?.data?.flatMap((road) =>
    decodePolyline(road.polyline),
  );
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "var(--primary)",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

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
      </Map>
    </div>
  );
};
