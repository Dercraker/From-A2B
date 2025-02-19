import { google } from "@googlemaps/routing/build/protos/protos";
import { TransportMode } from "@prisma/client";

const transportModeMapping: Record<
  TransportMode,
  google.maps.routing.v2.RouteTravelMode
> = {
  [TransportMode.Walk]: google.maps.routing.v2.RouteTravelMode.WALK,
  [TransportMode.Bike]: google.maps.routing.v2.RouteTravelMode.BICYCLE,
  [TransportMode.Car]: google.maps.routing.v2.RouteTravelMode.DRIVE,
  [TransportMode.Boat]:
    google.maps.routing.v2.RouteTravelMode.TRAVEL_MODE_UNSPECIFIED,
  [TransportMode.Plane]:
    google.maps.routing.v2.RouteTravelMode.TRAVEL_MODE_UNSPECIFIED,
};

// Utilisation de la mapping
export const getTravelMode = (
  mode: TransportMode,
): google.maps.routing.v2.RouteTravelMode => transportModeMapping[mode];
