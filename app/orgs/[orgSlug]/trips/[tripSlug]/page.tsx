import { tripMetadata } from "@lib/metadata";
import type { PageParams, TripPathParams } from "@type/next";
import type { Metadata } from "next";
import { StepList } from "./_component/stepList";
import { TripMap } from "./_component/tripMap";

export async function generateMetadata({
  params,
}: PageParams<TripPathParams>): Promise<Metadata> {
  const { tripSlug } = await params;

  return tripMetadata(tripSlug);
}

const RoutePage = async ({ params }: PageParams<TripPathParams>) => {
  const { orgSlug, tripSlug } = await params;

  return (
    <>
      <StepList tripSlug={tripSlug} orgSlug={orgSlug} />
      <TripMap
        tripSlug={tripSlug}
        orgSlug={orgSlug}
        className="hidden size-full items-center justify-center border bg-slate-500 md:flex"
      />
    </>
  );
};

export default RoutePage;
