import type { LayoutParams } from "@type/next";

export default async function RouteLayout({ children }: LayoutParams) {
  return <>{children}</>;
}
