import { tripMetadata } from "@lib/metadata";
import type { LayoutParams, PageParams, TripPathParams } from "@type/next";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageParams<TripPathParams>): Promise<Metadata> {
  const { tripSlug } = await params;

  return tripMetadata(tripSlug);
}

export default async function RouteLayout({ children }: LayoutParams) {
  return <>{children}</>;
}
