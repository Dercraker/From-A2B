import { Layout, LayoutContent } from "@components/page/layout";
import { EditTripForm } from "@components/trips/editTripForm";
import type { PageParams } from "@type/next";

const RoutePage = async ({
  params,
}: PageParams<{ orgSlug: string; tripSlug: string }>) => {
  const { tripSlug } = await params;

  return (
    <Layout>
      <LayoutContent>
        <EditTripForm tripSlug={tripSlug} />
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
