import { Layout, LayoutContent } from "@components/page/layout";
import { Typography } from "@components/ui/typography";
import { combineWithParentMetadata } from "@lib/metadata";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const markdown = `Privacy demo dsfsdfsdfs`;

export const generateMetadata = combineWithParentMetadata({
  title: "Privacy",
  description: "Privacy policy",
});

export default function page() {
  return (
    <div>
      <div className="flex w-full items-center justify-center bg-card p-8 lg:p-12">
        <Typography variant="h1">Privacy</Typography>
      </div>
      <Layout>
        <LayoutContent className="prose m-auto mb-8 dark:prose-invert">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
