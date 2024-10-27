import { Layout, LayoutContent } from "@/components/page/layout";
import { EditTripForm } from "@/components/trips/editTripForm";
import type { PageParams } from "@/types/next";

const RoutePage = async ({
  params: { orgSlug, tripSlug },
}: PageParams<{ orgSlug: string; tripSlug: string }>) => {
  return (
    <Layout>
      <LayoutContent>
        <EditTripForm tripSlug={tripSlug} />
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
