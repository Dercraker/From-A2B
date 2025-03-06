import type { PageParams } from "@type/next";
import { SchedulingCard } from "./_component/schedulingCard";

export default async function RoutePage({
  params,
}: PageParams<{ orgSlug: string; tripSlug: string; stepSlug: string }>) {
  const { stepSlug, tripSlug } = await params;
  return <SchedulingCard stepSlug={stepSlug} tripSlug={tripSlug} />;
}
