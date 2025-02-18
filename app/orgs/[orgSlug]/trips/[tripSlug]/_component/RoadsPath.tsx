"use client";

import { GetTripRoadAction } from "@/features/trip/get/getTripRoads.action";
import { TRIP_KEY_Factory } from "@/features/trip/tripKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Polyline } from "./Polyline";

export type RoadsPathProps = {
  tripSlug: string;
};

export const RoadsPath = ({ tripSlug }: RoadsPathProps) => {
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

  return roads?.data?.map((road) => (
    <Polyline
      key={road.id}
      strokeWeight={4}
      strokeColor="#0aa374"
      encodedPath={road.polyline}
    />
  ));
};
