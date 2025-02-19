import { env } from "@lib/env/server";
import { authRoute, RouteError } from "@lib/safe-route";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = authRoute
  .query(
    z.object({
      input: z.string(),
    }),
  )
  .handler(async (req, { query }) => {
    if (!env.GOOGLE_PLACES_API_KEY)
      throw new RouteError("Missing API Key", 400);

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          },
          body: JSON.stringify({
            input: query.input,
            includedPrimaryTypes: [
              "street_address",
              "subpremise",
              "route",
              "street_number",
              "landmark",
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return NextResponse.json({ data: data.suggestions, error: null });
    } catch (error) {
      return NextResponse.json({ error: error, data: null });
    }
  });
