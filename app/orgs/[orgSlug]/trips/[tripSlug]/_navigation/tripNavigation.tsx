"use client";
import { LogoSvg } from "@components/svg/LogoSvg";
import { Sidebar, SidebarBody } from "@components/ui/sidebar";
import { Typography } from "@components/ui/typography";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, type PropsWithChildren, type ReactNode } from "react";

type TripNavigationProps = PropsWithChildren<{
  logoChildren: ReactNode;
  navigationChildren: ReactNode;
  bottomNavigationChildren: ReactNode;
}>;

export const TripNavigation = ({
  bottomNavigationChildren,
  logoChildren,
  navigationChildren,
}: TripNavigationProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody>
        <div className="flex items-center gap-2">
          <Link href="/" className="cursor-pointer">
            <LogoSvg size={32} />
          </Link>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: open ? 1 : 0,
            }}
            // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
            className="ml-1 flex items-center gap-2 text-white"
          >
            <Typography className="select-none font-mono text-2xl font-semibold">
              /
            </Typography>
            {logoChildren}
          </motion.span>
        </div>
        <div className="mt-8 flex h-full flex-col">{navigationChildren}</div>
        <div>{bottomNavigationChildren}</div>
      </SidebarBody>
    </Sidebar>
  );
};
