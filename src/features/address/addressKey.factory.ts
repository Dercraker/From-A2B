export const ADDRESS_KEY_FACTORY = {
  AutoComplete: (input: string) => ["AutoComplete", input],
  PlaceId: (placeId: string) => ["PlaceId", placeId],
  GeoCodingPos: (lat: number, lon: number) => [
    "GeoCoding",
    "GPS",
    { lat, lon },
  ],
};
