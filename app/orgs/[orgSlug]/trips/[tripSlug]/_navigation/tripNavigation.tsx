import { LogoSvg } from "@/components/svg/LogoSvg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Typography } from "@/components/ui/typography";
import { Menu } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

type TripNavigationProps = PropsWithChildren<{
  logoChildren?: ReactNode;
  navigationChildren?: ReactNode;
  bottomNavigationChildren?: ReactNode;
  topBarChildren?: ReactNode;
  topBarCornerLeftChildren?: ReactNode;
}>;

export const TripNavigation = async ({
  children,
  bottomNavigationChildren,
  logoChildren,
  navigationChildren,
  topBarChildren,
  topBarCornerLeftChildren,
}: TripNavigationProps) => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex max-h-screen flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="filled" size="icon" className="shrink-0">
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex items-center gap-2">
                <Link href="/" className="cursor-pointer">
                  <LogoSvg size={32} />
                </Link>
                <Typography variant="large" className="select-none font-mono">
                  /
                </Typography>
                {logoChildren}
              </div>
              {navigationChildren}
              <div className="mt-auto">{bottomNavigationChildren}</div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{topBarChildren}</div>
          <div className="flex items-center gap-2">
            {topBarCornerLeftChildren}
          </div>
        </header>
        <main className="flex h-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
};
