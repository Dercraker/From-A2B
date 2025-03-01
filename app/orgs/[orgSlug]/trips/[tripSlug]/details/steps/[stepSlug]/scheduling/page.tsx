import type { PageParams } from "@type/next";
import { SchedulingCard } from "./_component/schedulingCard";

export default async function RoutePage(
  props: PageParams<{ orgSlug: string; tripSlug: string; stepSlug: string }>,
) {
  return <SchedulingCard />;
}
