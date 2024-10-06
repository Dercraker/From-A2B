import { GetTripsByOrgQuery } from "@/features/trips/getTripsByOrg.query";
import { EmptyTrips } from "./_components/emptyTrips";

export default async function RoutePage() {
  const trips = await GetTripsByOrgQuery();

  if (!trips || !trips.length) return <EmptyTrips />;

  return (
    <div>
      {trips.map((trip) => (
        <div key={trip.id}>
          <p>{trip.name}</p>
          <p>{trip.description}</p>
        </div>
      ))}
    </div>
  );
}
