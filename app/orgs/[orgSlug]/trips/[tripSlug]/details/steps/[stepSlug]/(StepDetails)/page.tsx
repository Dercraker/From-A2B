import type { PageParams } from "@type/next";
import { StepDetail } from "./_component/StepDetail";

const RoutePage = async ({
  params,
}: PageParams<{ stepSlug: string; orgSlug: string; tripSlug: string }>) => {
  const { stepSlug, orgSlug, tripSlug } = await params;

  return (
    <StepDetail orgSlug={orgSlug} stepSlug={stepSlug} tripSlug={tripSlug} />
  );
};

export default RoutePage;
