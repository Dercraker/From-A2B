export const TRIP_KEY_Factory = {
  All: ["trips"],
  byId: (tripId: string): string[] => [...TRIP_KEY_Factory.All, tripId],
};
