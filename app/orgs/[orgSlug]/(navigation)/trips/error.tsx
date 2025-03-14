"use client";

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { Button } from "@components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { logger } from "@lib/logger";
import type { ErrorParams } from "@type/next";
import { useEffect } from "react";

export default function RouteError({ error, reset }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Error</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card variant="error">
          <CardHeader>
            <CardTitle>
              Sorry, something went wrong. Please try again later.
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Button onClick={reset}>Try again</Button>
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
