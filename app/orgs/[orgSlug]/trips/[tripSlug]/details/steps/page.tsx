import { Card, CardContent } from "@components/ui/card";
import { Typography } from "@components/ui/typography";
import { combineWithParentMetadata } from "@lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "Steps List",
  description: "Steps List",
});

export default async function RoutePage() {
  return (
    <Card className="max-h-40">
      <CardContent className="flex size-full select-none items-center justify-center">
        <Typography variant="lead">Select or Create any step</Typography>
      </CardContent>
    </Card>
  );
}
