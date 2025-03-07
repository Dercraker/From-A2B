import { Layout, LayoutContent, LayoutHeader } from "@components/page/layout";
import type { LayoutParams, StepPathParams } from "@type/next";
import { DetailNavigation } from "./_navigation/detailNavigation";

const RouteLayout = async ({
  params,
  children,
}: LayoutParams<StepPathParams>) => {
  const routeSlugs = await params;

  return (
    <Layout className="mt-0 justify-center  px-0">
      <LayoutHeader>
        <DetailNavigation {...routeSlugs} />
      </LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
    </Layout>
  );
};

export default RouteLayout;
