import { ContactSupportDialog } from "@components/contact/support/ContactSupportDialog";
import { HeaderBase } from "@components/layout/HeaderBase";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { buttonVariants } from "@components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import type { PageParams } from "@type/next";
import Link from "next/link";
import { getError } from "./auth-error-mapping";

export default async function AuthErrorPage(params: PageParams) {
  const searchParams = await params.searchParams;
  const { errorMessage, error } = getError(searchParams.error);

  return (
    <div className="flex h-full flex-col">
      <HeaderBase />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Authentification Error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card variant="error">
            <CardHeader>
              <CardDescription>{error}</CardDescription>
              <CardTitle>{errorMessage}</CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-2">
              <Link href="/" className={buttonVariants({ size: "sm" })}>
                Home
              </Link>
              <ContactSupportDialog />
            </CardFooter>
          </Card>
        </LayoutContent>
      </Layout>
    </div>
  );
}
