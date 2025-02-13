"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import type {
  NavigationLinksGroup,
  NavigationLinksGroups,
  NavigationLinks as NavigationLinksSchema,
} from "@/features/navigation/navigation.type";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { getTripNavigationLinks } from "./tripNavigation.link";

export const TripNavigationLinks = ({
  orgSlug,
  tripSlug,
}: {
  orgSlug: string;
  tripSlug: string;
}) => {
  const tripNavigation: NavigationLinksGroups = getTripNavigationLinks(
    orgSlug,
    tripSlug,
  );

  const links: NavigationLinksSchema = tripNavigation
    .flatMap((group: NavigationLinksGroup) => group.links)
    .filter((l) => !l.hidden);

  const currentPath = useCurrentPath(links);
  const { open, animate } = useSidebar();

  return (
    <>
      <LayoutGroup>
        <nav className="grid items-start text-sm">
          {tripNavigation.map((group, idx) => {
            const links = group.links.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 group/sidebar py-2 underline-offset-4 rounded-md hover:text-white ",
                    open ? "pl-3" : "justify-center",
                    currentPath === link.href
                      ? "underline bg-primary/20"
                      : "text-muted-foreground",
                  )}
                >
                  {link.Icon && <link.Icon className={cn("size-5")} />}

                  <motion.span
                    animate={{
                      display: animate
                        ? open
                          ? "inline-block"
                          : "none"
                        : "inline-block",
                      opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
                    className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            });

            return (
              <React.Fragment key={group.title + idx}>
                {!open && links}
                {open && (
                  <motion.div>
                    <Typography variant="large">{group.title}</Typography>
                    {links}
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </LayoutGroup>
    </>
  );
};
