import { NavigationWrapper } from "@components/navigation/NavigationWrapper";
import { Layout } from "@components/page/layout";
import { Alert } from "@components/ui/alert";
import { buttonVariants } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { currentUser } from "@lib/auth/helper";
import { getCurrentOrgCache } from "@lib/react/cache";
import type { LayoutParams, OrgPathParams } from "@type/next";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { OrgNavigation } from "./_navigation/OrgNavigation";

export default async function RouteLayout({
  params,
  children,
}: LayoutParams<OrgPathParams>) {
  const { orgSlug } = await params;
  const org = await getCurrentOrgCache();

  if (!org) {
    const user = await currentUser();
    return (
      <NavigationWrapper>
        <Layout>
          <Alert>
            <Rabbit className="size-4" />
            <div>
              <Typography variant="large">
                Oh! You are not logged in or the organization with the ID{" "}
                <Typography variant="code">{orgSlug}</Typography> was not found.
              </Typography>
              {user ? (
                <Link
                  href="/orgs"
                  className={buttonVariants({
                    className: "mt-2",
                  })}
                >
                  Return to your organizations
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className={buttonVariants({
                    className: "mt-2",
                  })}
                >
                  Sign in
                </Link>
              )}
            </div>
          </Alert>
        </Layout>
      </NavigationWrapper>
    );
  }

  return <OrgNavigation>{children}</OrgNavigation>;
}
