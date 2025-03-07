import type { PageParams, TripPathParams } from "@type/next";
import { StepList } from "./_component/stepList";
import { TripMap } from "./_component/tripMap";

const RoutePage = async ({ params }: PageParams<TripPathParams>) => {
  const { orgSlug, tripSlug } = await params;

  await new Promise((resolve) => setTimeout(resolve, 5000));

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
