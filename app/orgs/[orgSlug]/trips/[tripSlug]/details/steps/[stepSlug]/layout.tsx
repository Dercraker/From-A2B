import { Layout, LayoutContent, LayoutHeader } from "@components/page/layout";
import { stepMetadata } from "@lib/metadata";
import type { LayoutParams, PageParams, StepPathParams } from "@type/next";
import type { Metadata } from "next";
import { DetailNavigation } from "./_navigation/detailNavigation";

export async function generateMetadata({
  params,
}: PageParams<StepPathParams>): Promise<Metadata> {
  const { stepSlug } = await params;

  return stepMetadata(stepSlug);
}
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
