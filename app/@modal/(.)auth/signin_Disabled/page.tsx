import type { PageParams } from "@type/next";
import { SignInDialog } from "./SignInDialog";

export default async function RoutePage(props: PageParams) {
  return <SignInDialog />;
}
