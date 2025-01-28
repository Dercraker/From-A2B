import { version } from "@/../package.json";
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/site-config";
import Link from "next/link";
import { Layout, LayoutContent } from "../page/layout";
import { LogoSvg } from "../svg/LogoSvg";

export const Footer = () => {
  return (
    <footer className="border border-border bg-card">
      <Layout className="py-24">
        <LayoutContent className="flex justify-between max-lg:flex-col">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <Link href="/" className="flex items-center gap-2">
                <LogoSvg />
                <Typography variant="h3">{SiteConfig.title}</Typography>
              </Link>
              <Typography variant="muted">V{version}</Typography>
              <Typography variant="muted">{SiteConfig.company.name}</Typography>
              <Typography variant="muted">
                {SiteConfig.company.address}
              </Typography>
            </div>
            <Typography variant="muted" className="italic">
              © {new Date().getFullYear()} {SiteConfig.company.name} - All
              rights reserved.
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Typography variant="large">Legal</Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/legal/terms"
            >
              Terms
            </Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/legal/privacy"
            >
              Privacy
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Typography variant="large">Resources</Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/orgs"
            >
              Dashboard
            </Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/account"
            >
              Account
            </Typography>
          </div>
        </LayoutContent>
      </Layout>
    </footer>
  );
};
