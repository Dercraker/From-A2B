import type { PageParams, StepPathParams } from "@type/next";
import { StepDetail } from "./_component/StepDetail";

import { combineWithParentMetadata } from "@lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "Details",
  description: "Step details",
});

const RoutePage = async ({ params }: PageParams<StepPathParams>) => {
  const { stepSlug, orgSlug, tripSlug } = await params;

  return (
    <StepDetail orgSlug={orgSlug} stepSlug={stepSlug} tripSlug={tripSlug} />
  );
};

export default RoutePage;
