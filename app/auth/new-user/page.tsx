import { Header } from "@/components/layout/Header";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { buttonVariants } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * This page is show when a user loggin. You can add an onboarding process here.
 */
const NewUserPage = async (params: PageParams) => {
  const searchParams = await params.searchParams;

  const callbackUrl =
    typeof searchParams.callbackUrl === "string"
      ? searchParams.callbackUrl
      : "/";

  redirect(callbackUrl);

  return (
    <>
      <Header />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Successfully login</LayoutTitle>
          <LayoutDescription>You can now use the app</LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
};

export default NewUserPage;
