import type { LatLng, LatLngTuple } from "@googlemaps/polyline-codec";
import { decode, encode } from "@googlemaps/polyline-codec";

export const encodePolyline = (path: (number[] | LatLng | LatLngTuple)[]) =>
  encode(path, 5);

export const decodePolyline = (polyline: string) =>
  decode(polyline).map(([lat, lng]) => ({ lat, lng }));
