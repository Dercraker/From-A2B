import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { AddTripDialog } from "@/components/trips/addTripDialog";
import { Button } from "@/components/ui/button";
import { LayoutParams } from "@/types/next";

const TripsLayout = async ({ children }: LayoutParams) => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your trips</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <AddTripDialog>
          <Button variant="outline">Create</Button>
        </AddTripDialog>
      </LayoutActions>
      <LayoutContent className="flex gap-6">{children}</LayoutContent>
    </Layout>
  );
};

export default TripsLayout;
