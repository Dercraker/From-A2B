"use server";

import MarkdownEmail from "@email/Markdown.email";
import { CreateUpdateProfileVerificationTokenQuery } from "@feat/token/createUpdateProfileVerificationToken.query";
import { DeleteVerificationTokenUpdateProfileQuery } from "@feat/token/deleteVerificationTokenUpdateProfile.query";
import { authAction } from "@lib/actions/safe-actions";
import { sendEmail } from "@lib/mail/sendEmail";
import { z } from "zod";

const SendUpdateEmailVerificationCodeActionSchema = z.object({
  newEmail: z.string().email(),
});

export const sendUpdateEmailVerificationCodeAction = authAction
  .schema(SendUpdateEmailVerificationCodeActionSchema)
  .action(async ({ parsedInput: { newEmail } }) => {
    await DeleteVerificationTokenUpdateProfileQuery({ newEmail });

    const verificationToken = await CreateUpdateProfileVerificationTokenQuery({
      newEmail,
    });

    //TODO: Create Email
    await sendEmail({
      to: newEmail,
      subject: "[Action required] Change Email",
      react: MarkdownEmail({
        markdown: `Hi,
        
You have requested to update your profile email.

Here is your verification code: ${verificationToken.token}

⚠️ If you didn't request this, please ignore this email.

Best,`,
        preview: "Request to update your profile email",
      }),
    });

    return {
      send: true,
    };
  });
