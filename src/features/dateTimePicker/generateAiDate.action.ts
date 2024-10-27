"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { openaiModel } from "@/lib/ai/ai";
import { logger } from "@/lib/logger";
import { generateText } from "ai";
import { z } from "zod";

export const generateAIDateAction = orgAction
  .schema(
    z.object({
      localDateUTC: z.string(),
      prompt: z.string(),
      timeZoneStr: z.string(),
    }),
  )
  .action(async ({ parsedInput: { localDateUTC, prompt, timeZoneStr } }) => {
    const date = await generateText({
      model: openaiModel,
      temperature: 0,
      prompt: `Context:
    You are a professional time finder. The user will give you a prompt, the current date and the current timezone. You must return the date in the UTC format with the correct timezone (defined by the date and timezone the user gave you).

    Goal:
    Find the date in the UTC format.

    Information:
    * User current date : ${localDateUTC}
    * User prompt : ${prompt}
    * User Timezone : ${timeZoneStr}

    Example of valid UTC format :

    * Tue, 30 Jul 2024 00:16:18 GMT

    Response format:
    * Date in UTC format
    * NOTHING ELSE
    * NO THINKING NEEDED
    * JUST RETURN THE DATE IN UTC FORMAT
    `,
    });
    logger.debug(`* User current date : ${localDateUTC}
* User prompt : ${prompt}
* User Timezone : ${timeZoneStr}`);

    const returnDate = new Date(date.text);

    logger.debug("generateAIDateAction", {
      text: date.text,
      prompt,
      timeZoneStr,
      localDateUTC,
      returnDate,
    });
    if (isNaN(returnDate.getTime())) {
      logger.debug("generateAIDateAction", {
        text: date.text,
        prompt,
        timeZoneStr,
        localDateUTC,
      });
      throw new Error("Invalid date returned from AI");
    }

    return date.text;
  });
