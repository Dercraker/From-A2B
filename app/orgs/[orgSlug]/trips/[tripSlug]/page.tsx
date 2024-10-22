import { GetTripQuery } from "@/features/trip/get/getTrip.query";
import { PageParams } from "@/types/next";
import { StepList } from "./_component/stepList";
import { TripMap } from "./_component/tripMap";

const RoutePage = async ({
  params: { orgSlug, tripSlug },
}: PageParams<{ orgSlug: string; tripSlug: string }>) => {
  const trip = await GetTripQuery({
    where: { slug: tripSlug, Organization: { slug: orgSlug } },
  });

  return (
    <>
      <StepList tripId={trip.id} tripSlug={tripSlug} orgSlug={orgSlug} />
      <TripMap
        tripId={trip.id}
        tripSlug={tripSlug}
        orgSlug={orgSlug}
        className="hidden size-full items-center justify-center border bg-slate-500 md:flex"
      />
    </>
  );
};

export default RoutePage;
