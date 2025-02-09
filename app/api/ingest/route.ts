import { route } from "@/lib/safe-route";
import { NextResponse } from "next/server";

export const GET = route.handler(async (req) => {
  return NextResponse.next({ request: req });
});

export const POST = route.handler(async (req) => {
  return NextResponse.next({ request: req });
});
