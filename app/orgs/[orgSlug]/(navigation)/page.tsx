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
import type { PageParams } from "@type/next";
import Link from "next/link";
import { SiteConfig } from "site-config";

export const generateMetadata = combineWithParentMetadata({
  title: "Dashboard",
  description: "Dashboard",
});

const RoutePage = async ({
  params,
}: PageParams<{
  orgSlug: string;
}>) => {
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
      <LayoutContent className="flex  gap-6">
        <Typography>TODO : ADD CONTENT</Typography>
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
