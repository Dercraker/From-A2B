"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const InvalidTokenCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invalid token</CardTitle>
        <CardDescription>Please try again later</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href="/account/danger"
          className={buttonVariants({ variant: "filled" })}
        >
          Retry
        </Link>
      </CardFooter>
    </Card>
  );
};
