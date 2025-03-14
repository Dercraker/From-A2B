import type { PageParams, TripPathParams } from "@type/next";
import { DetailsDialog } from "./_components/DetailsDialog";

const RoutePage = async ({ params }: PageParams<TripPathParams>) => {
  const { tripSlug, orgSlug } = await params;

  return <DetailsDialog orgSlug={orgSlug} tripSlug={tripSlug} />;
};

export default RoutePage;
