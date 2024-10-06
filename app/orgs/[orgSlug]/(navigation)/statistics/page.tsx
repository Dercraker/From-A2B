import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { Button } from "@/components/ui/button";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { DonutChart } from "./donuts-chart";
import { UsersChart } from "./users-chart";

export const generateMetadata = combineWithParentMetadata({
  title: "Users",
  description: "Manage leads",
});

const RoutePage = async (props: PageParams) => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Demo Page</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <Button variant="filled">Delete</Button>
        <Button variant="invert">Create</Button>
      </LayoutActions>
      <LayoutContent className="flex  gap-6">
        <UsersChart />
        <DonutChart />
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
