import { env } from "@/lib/env/server";
import { RoadTypeSchema } from "@/types/routesApi/road.type";
import { v2 } from "@googlemaps/routing";
import { google } from "@googlemaps/routing/build/protos/protos";

const routesClient = new v2.RoutesClient({
  apiKey: env.GOOGLE_ROUTES_API_KEY,
});

type ComputeRoutesProps = {
  origin: google.maps.routing.v2.IWaypoint;
  destination: google.maps.routing.v2.IWaypoint;
  travelMode: google.maps.routing.v2.RouteTravelMode;
};

export const ComputeRoutes = async ({
  origin,
  destination,
  travelMode,
}: ComputeRoutesProps) => {
  const roads = await routesClient.computeRoutes(
    {
      origin: {
        ...origin,
      },
      destination: {
        ...destination,
      },
      travelMode,
      routingPreference:
        travelMode !== google.maps.routing.v2.RouteTravelMode.WALK &&
        travelMode !== google.maps.routing.v2.RouteTravelMode.BICYCLE
          ? "TRAFFIC_UNAWARE"
          : undefined,
      computeAlternativeRoutes: false,
      languageCode: "en-US",
      polylineQuality: "HIGH_QUALITY",
      units: "METRIC",
    },
    {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
      },
    },
  );

  return RoadTypeSchema.parse({
    distance: roads?.[0].routes?.[0].distanceMeters,
    duration: Number(roads?.[0].routes?.[0].duration?.seconds),
    polyline: roads?.[0].routes?.[0].polyline?.encodedPolyline,
  });
};
