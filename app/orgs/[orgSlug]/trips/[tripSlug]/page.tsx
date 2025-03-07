import { GetTripQuery } from "@feat/trip/get/getTrip.query";
import type { PageParams, TripPathParams } from "@type/next";
import { StepList } from "./_component/stepList";
import { TripMap } from "./_component/tripMap";

const RoutePage = async ({ params }: PageParams<TripPathParams>) => {
  const { orgSlug, tripSlug } = await params;

  const trip = await GetTripQuery({
    where: { slug: tripSlug, Organization: { slug: orgSlug } },
  });

  return (
    <>
      <StepList tripSlug={tripSlug} orgSlug={orgSlug} />
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
