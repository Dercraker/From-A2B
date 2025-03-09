import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { GetRequiredUser } from "@lib/auth/helper";
import type { LayoutParams } from "@type/next";

export default async function RouteLayout(props: LayoutParams) {
  const user = await GetRequiredUser();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          {user.name ? `${user.name}'s` : "Your"} Settings
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>{props.children}</LayoutContent>
    </Layout>
  );
}
