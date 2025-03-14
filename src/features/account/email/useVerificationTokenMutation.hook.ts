"use client";

import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyUpdateEmailTokenAction } from "./verifyUpdateEmailToken.action";

type useVerificationTokenMutationProps = {
  onEmailVerified: (token: string) => void;
  newEmail: string;
};

export const useVerificationTokenMutation = ({
  onEmailVerified,
  newEmail,
}: useVerificationTokenMutationProps) => {
  return useMutation({
    mutationFn: async (token: string) => {
      const result = await verifyUpdateEmailTokenAction({
        newEmail,
        token,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      if (!result.data.valid) {
        toast.error("Invalid token");
        return;
      }

      toast.success("Email verified", {});

      onEmailVerified(token);
    },
  });
};
