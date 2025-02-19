import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import type { PropsWithChildren } from "react";

export const BaseLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="min-h-full flex-1 pb-16 pt-8 lg:pt-12">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
