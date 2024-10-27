import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Card className="max-h-40">
      <CardContent className="flex size-full select-none items-center justify-center">
        <Typography variant="lead">Select or Create any step</Typography>
      </CardContent>
    </Card>
  );
}
