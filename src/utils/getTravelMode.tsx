import { google } from "@googlemaps/routing/build/protos/protos";
import { TransportMode } from "@prisma/client";

const TransportModeMapping: Record<
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
export const GetTravelMode = (
  mode: TransportMode,
): google.maps.routing.v2.RouteTravelMode => TransportModeMapping[mode];

// Mapping entre TransportMode et une chaîne
const TransportModeToString: Record<TransportMode, string> = {
  [TransportMode.Walk]: "Walk",
  [TransportMode.Bike]: "Bike",
  [TransportMode.Car]: "Car",
  [TransportMode.Boat]: "Boat",
  [TransportMode.Plane]: "Plane",
};

// Fonction pour obtenir la chaîne correspondante
export const GetTransportModeString = (mode: TransportMode): string => {
  return TransportModeToString[mode] || "Unknown mode"; // Valeur par défaut si le mode n'est pas trouvé
};

// Mapping entre une chaîne et TransportMode
const stringToTransportMode: Record<string, TransportMode> = {
  Walk: TransportMode.Walk,
  Bike: TransportMode.Bike,
  Car: TransportMode.Car,
  Boat: TransportMode.Boat,
  Plane: TransportMode.Plane,
};

// Fonction pour obtenir le TransportMode correspondant
export const GetTransportModeFromString = (
  modeString: string,
): TransportMode => {
  return stringToTransportMode[modeString] || TransportMode.Walk; // Valeur par défaut si la chaîne n'est pas trouvée
};
