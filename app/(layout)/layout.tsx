import { BaseLayout } from "@/components/layout/BaseLayout";
import type { PropsWithChildren } from "react";

export default function RouteLayout(props: PropsWithChildren) {
  return <BaseLayout>{props.children}</BaseLayout>;
}
