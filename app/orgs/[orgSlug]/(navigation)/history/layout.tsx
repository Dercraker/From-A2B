import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import type { LayoutParams } from "@/types/next";

const HistoryLayout = async ({ children }: LayoutParams) => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Travel history</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex h-full gap-6">{children}</LayoutContent>
    </Layout>
  );
};

export default HistoryLayout;
