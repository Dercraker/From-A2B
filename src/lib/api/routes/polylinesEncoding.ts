import { decode } from "@googlemaps/polyline-codec";

export const decodePolyline = (polyline: string) =>
  decode(polyline).map(([lat, lng]) => ({ lat, lng }));
