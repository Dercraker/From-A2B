import { LogoSvg } from "@components/svg/LogoSvg";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { SiteConfig } from "site-config";
import { Layout } from "../page/layout";

export const HeaderBase = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Layout className="my-2">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold"
          >
            <LogoSvg size={32} />
            {SiteConfig.title}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">{children}</nav>
        </div>
      </Layout>
    </header>
  );
};
