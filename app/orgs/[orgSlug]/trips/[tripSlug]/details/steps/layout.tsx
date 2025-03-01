import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import type { LayoutParams } from "@type/next";
import { DetailStepList } from "./_component/detailStepList";

const RouteLayout = async ({
  children,

  params,
}: LayoutParams<{ orgSlug: string; tripSlug: string }>) => {
  const { tripSlug, orgSlug } = await params;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Steps</LayoutTitle>
        <LayoutDescription>Manage all your steps</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="max-lg: flex justify-between gap-2 max-lg:flex-col">
        <DetailStepList tripSlug={tripSlug} orgSlug={orgSlug} />
        {children}
      </LayoutContent>
    </Layout>
  );
};

export default RouteLayout;
