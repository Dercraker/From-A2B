import type { LatLng } from "@googlemaps/polyline-codec";
import { v2 } from "@googlemaps/routing";
import type { google } from "@googlemaps/routing/build/protos/protos";
import { env } from "@lib/env/server";
import type { TransportMode } from "@prisma/client";
import { RoadTypeSchema, type RoadType } from "@type/routesApi/road.type";
import { GetTravelMode } from "@utils/getTravelMode";
import { encodePolyline } from "./polylinesEncoding";

const routesClient = new v2.RoutesClient({
  apiKey: env.GOOGLE_ROUTES_API_KEY,
});

type ComputeRoutesProps = {
  origin: google.maps.routing.v2.IWaypoint;
  destination: google.maps.routing.v2.IWaypoint;
  transportMode: TransportMode;
};

export const ComputeRoutes = async ({
  origin,
  destination,
  transportMode,
}: ComputeRoutesProps) => {
  if (transportMode === "Plane" || transportMode === "Boat")
    return {
      distance: 0,
      duration: 0,
      polyline: encodePolyline([
        {
          lat: origin.location?.latLng?.latitude ?? 0,
          lng: origin.location?.latLng?.longitude ?? 0,
        } satisfies LatLng,
        {
          lat: destination.location?.latLng?.latitude ?? 0,
          lng: destination.location?.latLng?.longitude ?? 0,
        } satisfies LatLng,
      ]),
    } satisfies RoadType;

  const roads = await routesClient.computeRoutes(
    {
      origin: {
        ...origin,
      },
      destination: {
        ...destination,
      },
      travelMode: GetTravelMode(transportMode),
      routingPreference:
        transportMode !== "Walk" && transportMode !== "Bike"
          ? "TRAFFIC_UNAWARE"
          : undefined,
      computeAlternativeRoutes: false,
      languageCode: "en-US",
      polylineQuality: "HIGH_QUALITY",
      polylineEncoding: "ENCODED_POLYLINE",
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
