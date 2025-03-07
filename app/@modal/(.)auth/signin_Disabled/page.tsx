import type { PageParams } from "@type/next";
import { SignInDialog } from "./SignInDialog";

import { combineWithParentMetadata } from "@lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "Sign in",
  description: "Sign in to your account",
});

export default async function RoutePage(props: PageParams) {
  return <SignInDialog />;
}
