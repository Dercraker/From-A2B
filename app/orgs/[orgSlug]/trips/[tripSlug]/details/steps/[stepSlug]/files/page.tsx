import { Layout, LayoutContent } from "@components/page/layout";
import type { PageParams } from "@type/next";
import { Card, CardContent } from "@ui/card";
import { FilesList } from "./_component/filesList";
import { FileUploader } from "./_component/fileUploader";

const RoutePage = async ({
  params,
}: PageParams<{ orgSlug: string; tripSlug: string; stepSlug: string }>) => {
  const { tripSlug, stepSlug } = await params;

  return (
    <Layout>
      <LayoutContent>
        <Card className="pt-6">
          <CardContent className="flex flex-col gap-4">
            <FileUploader stepSlug={stepSlug} tripSlug={tripSlug} />
            <FilesList stepSlug={stepSlug} tripSlug={tripSlug} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
