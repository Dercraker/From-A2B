"use client";

import { GetTripRoadAction } from "@/features/trip/get/getTripRoads.action";
import { TRIP_KEY_Factory } from "@/features/trip/tripKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { decodePolyline } from "@/lib/api/routes/polylinesEncoding";
import { useQuery } from "@tanstack/react-query";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { toast } from "sonner";

export type RoadsPathProps = {
  tripSlug: string;
};

export const RoadsPath = ({ tripSlug }: RoadsPathProps) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");

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
    enabled: !!maps,
  });

  if (maps && roads) {
    const path = new maps.Polyline({
      path: roads.data?.flatMap((road) => decodePolyline(road.polyline)) ?? [],
      geodesic: true,
      strokeColor: "#0aa374",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    path.setMap(map);
  }

  return null;
};
