"use client";

import type { DisclosureHandler } from "@hooks/useDisclosure";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "../UpdateProfile.action";
import type { ProfileFormType } from "./editProfile.schema";
import { useSendChangeEmailVerificationCode } from "./useSendChangeEmailVerificationCode.hook";

type useUpdateProfileMutationProps = {
  verificationDialogHandler: DisclosureHandler;
  defaultEmail: string;
  newEmail: string;
};

export const useUpdateProfileMutation = ({
  verificationDialogHandler,
  defaultEmail,
  newEmail,
}: useUpdateProfileMutationProps) => {
  const { mutate: SendChangeEmailVerificationCode } =
    useSendChangeEmailVerificationCode({ verificationDialogHandler, newEmail });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ProfileFormType) => {
      if (values.email !== defaultEmail && values.token === undefined) {
        SendChangeEmailVerificationCode();
        return;
      }

      const result = await updateProfileAction({
        ...values,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Profile updated");
      router.refresh();
    },
  });

  return mutation;
};
