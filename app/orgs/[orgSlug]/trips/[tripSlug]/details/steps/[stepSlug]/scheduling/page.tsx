import type { PageParams } from "@type/next";

export default async function RoutePage(
  props: PageParams<{ orgSlug: string; tripSlug: string; stepSlug: string }>,
) {
  return <>Schedule</>;
}
