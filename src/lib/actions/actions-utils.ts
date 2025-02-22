/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "@lib/logger";
import type { SafeActionResult } from "next-safe-action";
import type { z } from "zod";

/**
 * Determines if a server action is successful or not
 * A server action is successful if it has a data property and no serverError property
 *
 * @param action Return value of a server action
 * @returns A boolean indicating if the action is successful
 */
export const isActionSuccessful = <T extends z.ZodType, Data>(
  action?: SafeActionResult<string, T, readonly [], any, any, Data>,
): action is {
  data: Data;
  serverError: undefined;
  validationError: undefined;
} => {
  if (!action) {
    logger.error({ message: "🐞~ IsActionSuccessful ~ No action returned" });
    return false;
  }

  if (action.serverError) {
    logger.error({
      message: "🐞~ IsActionSuccessful ~ Server error throw",
      serverError: action.serverError,
    });
    return false;
  }

  if (action.validationErrors) {
    logger.error({
      message: "🐞~ IsActionSuccessful ~ Action schema validation failed",
      validationErrors: action.validationErrors,
    });
    return false;
  }

  return true;
};

/**
 * Converts an action result to a promise that resolves to false
 *
 * @param action Return value of a server action
 * @returns A promise that resolves to false
 */
export const resolveActionResult = async <T extends z.ZodType, Data>(
  action: Promise<
    SafeActionResult<string, T, readonly [], any, any, Data> | undefined
  >,
): Promise<Data> => {
  return new Promise((resolve, reject) => {
    action
      .then((result) => {
        if (isActionSuccessful(result)) {
          resolve(result.data);
        } else {
          reject(result?.serverError ?? "Something went wrong");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
