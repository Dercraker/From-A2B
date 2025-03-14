"use client";
import { useMatchingPathname } from "@hooks/useMatchingPathname";
import { buttonVariants } from "@ui/button";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { GetDetailLinks } from "./detailNavigation.link";

export type detailSelectProps = {
  orgSlug: string;
  tripSlug: string;
  stepSlug: string;
};

export const DetailNavigation = ({
  orgSlug,
  stepSlug,
  tripSlug,
}: detailSelectProps) => {
  const detailLinks = GetDetailLinks(orgSlug, tripSlug, stepSlug);

  const isMatching = useMatchingPathname(detailLinks.map((l) => l.href));

  return (
    <div className="flex gap-2">
      {detailLinks.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cx(
            buttonVariants({
              variant: isMatching === l.href ? "outline" : "filled",
            }),
          )}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
};
