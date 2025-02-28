"use client";

import type { DisclosureHandler } from "@hooks/useDisclosure";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendUpdateEmailVerificationCodeAction } from "./sendUpdateEmailVerificationCode.action";

type useSendChangeEmailVerificationCodeProps = {
  verificationDialogHandler: DisclosureHandler;
  newEmail: string;
};

export const useSendChangeEmailVerificationCode = ({
  verificationDialogHandler,
  newEmail,
}: useSendChangeEmailVerificationCodeProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      verificationDialogHandler.open();

      const result = await sendUpdateEmailVerificationCodeAction({ newEmail });

      if (!isActionSuccessful(result)) {
        verificationDialogHandler.close();
        toast.error("Failed to send email");
        return;
      }

      return Date.now();
    },
  });

  return mutation;
};
