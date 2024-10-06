import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { buttonVariants } from "@/components/ui/button";
import { isInRoles } from "@/lib/organizations/isInRoles";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
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
            href={`/orgs/${props.params.orgSlug}/settings/members`}
            className={buttonVariants({ variant: "filled" })}
          >
            Invite member
          </Link>
        ) : null}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        Dashboard Content here
      </LayoutContent>
    </Layout>
  );
}
