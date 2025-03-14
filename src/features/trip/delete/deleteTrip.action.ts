"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { DeleteTripQuery } from "./deleteTrip.query";

export const DeleteTripAction = orgAction
  .metadata({
    roles: ["OWNER", "ADMIN"],
  })
  .schema(z.object({ tripId: z.string() }))
  .action(async ({ parsedInput: { tripId }, ctx }) => {
    return DeleteTripQuery({ orgId: ctx.org.id, tripId });
  });
