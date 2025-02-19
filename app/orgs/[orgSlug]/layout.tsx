import { orgMetadata } from "@lib/metadata";
import { getCurrentOrgCache } from "@lib/react/cache";
import type { LayoutParams, PageParams } from "@type/next";
import type { Metadata } from "next";
import { InjectCurrentOrgStore } from "./useCurrentOrg";

export async function generateMetadata({
  params,
}: PageParams<{ orgSlug: string }>): Promise<Metadata> {
  const { orgSlug } = await params;

  return orgMetadata(orgSlug);
}

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  const org = await getCurrentOrgCache();

  return (
    <InjectCurrentOrgStore
      org={
        org?.org
          ? {
              id: org.org.id,
              slug: org.org.slug,
              name: org.org.name,
              image: org.org.image,
              plan: org.org.plan,
            }
          : undefined
      }
    >
      {props.children}
    </InjectCurrentOrgStore>
  );
}
