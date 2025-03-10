import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { buttonVariants } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { combineWithParentMetadata } from "@lib/metadata";
import { isInRoles } from "@lib/organizations/isInRoles";
import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import type { OrgPathParams, PageParams } from "@type/next";
import Link from "next/link";
import { NextStepViewport } from "nextstepjs";
import { Suspense } from "react";
import { SiteConfig } from "site-config";
import { TourList } from "./_components/TourList";
import { DashboardContentLoader } from "./_loader/dashboardContentLoader";

export const generateMetadata = combineWithParentMetadata({
  title: "Dashboard",
  description: "Dashboard",
});

const RoutePage = async ({ params }: PageParams<OrgPathParams>) => {
  const { orgSlug } = await params;

  const org = await getRequiredCurrentOrgCache();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        {isInRoles(org.roles, ["ADMIN"]) &&
        !SiteConfig.features.enableSingleMemberOrg ? (
          <Link
            href={`/orgs/${orgSlug}/settings/members`}
            className={buttonVariants({ variant: "filled" })}
          >
            Invite member
          </Link>
        ) : null}
      </LayoutActions>
      <NextStepViewport id="OnboardingTour-Step1">
        <LayoutContent className="flex  gap-6">
          <Suspense fallback={<DashboardContentLoader />}>
            <Typography>TODO : ADD CONTENT</Typography>
            <TourList />
          </Suspense>
        </LayoutContent>
      </NextStepViewport>
    </Layout>
  );
};

export default RoutePage;
