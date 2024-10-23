"use client";

import { PoiMarkers } from "@/components/map/poiMarkers";
import { Poi, Pois } from "@/features/map/poi.type";
import { useTripStore } from "@/features/trip/trip.store";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import {
  Map,
  MapCameraChangedEvent,
  RenderingType,
} from "@vis.gl/react-google-maps";
import { useMemo, type ComponentPropsWithoutRef } from "react";
import { useShallow } from "zustand/react/shallow";

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

  // const poi: Pois = [
  //   { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  //   { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  //   { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  //   { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  //   { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  //   { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  //   { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  //   { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  //   { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  //   { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  //   { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  //   {
  //     key: "kingStreetWharf",
  //     location: { lat: -33.8665445, lng: 151.1989808 },
  //   },
  //   { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  //   { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  //   { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
  // ] satisfies Pois;

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
        // disableDefaultUI
      >
        <PoiMarkers pois={poi} />
      </Map>
    </div>
  );
};
