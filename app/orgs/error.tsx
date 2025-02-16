"use client";
import { NavigationWrapper } from "@/components/navigation/NavigationWrapper";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { Page400 } from "@/components/page/Page400";
import { logger } from "@/lib/logger";
import type { ErrorParams } from "@/types/next";
import { useEffect } from "react";

const RouteError = ({ error }: ErrorParams) => {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <NavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Organization error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Page400 />
        </LayoutContent>
      </Layout>
    </NavigationWrapper>
  );
};

export default RouteError;
