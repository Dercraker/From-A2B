import type { PageParams } from "@/types/next";
import { DetailsDialog } from "./_components/DetailsDialog";

const RoutePage = async ({
  params,
}: PageParams<{ orgSlug: string; tripSlug: string }>) => {
  const { tripSlug, orgSlug } = await params;

  return <DetailsDialog orgSlug={orgSlug} tripSlug={tripSlug} />;
};

export default RoutePage;
