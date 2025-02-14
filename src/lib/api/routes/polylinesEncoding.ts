export const decodePolyline = (polyline: string) =>
  google.maps.geometry.encoding.decodePath(polyline);
