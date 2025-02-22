"use client";

import type { Pois } from "@feat/map/poi.type";
import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Typography } from "@ui/typography";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { InlineTooltip } from "../ui/tooltip";

export type PoiMarkersProps = {
  pois: Pois;
};

export const PoiMarkers = ({ pois }: PoiMarkersProps) => {
  const map = useMap();

  const [markers, setMarkers] = useState<Record<string, Marker>>({});
  const clustered = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clustered.current) clustered.current = new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    clustered.current?.clearMarkers();
    clustered.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const { [key]: _, ...remainingMarkers } = prev;
        return remainingMarkers;
      }
    });
  };

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map],
  );

  return (
    <>
      {pois.map((poi, idx) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable
          onClick={handleClick}
        >
          <InlineTooltip title={poi.key}>
            <div className="flex size-6 items-center justify-center rounded-full bg-primary ring-2 ring-accent/70">
              <Typography variant="large">{idx + 1}</Typography>
            </div>
          </InlineTooltip>
        </AdvancedMarker>
      ))}
    </>
  );
};
