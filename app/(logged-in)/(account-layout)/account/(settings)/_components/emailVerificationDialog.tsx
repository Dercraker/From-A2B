import { LoadingButton } from "@components/form/LoadingButton";
import { useSendChangeEmailVerificationCode } from "@feat/account/email/useSendChangeEmailVerificationCode.hook";
import { useVerificationTokenMutation } from "@feat/account/email/useVerificationTokenMutation.hook";
import type { DisclosureHandler } from "@hooks/useDisclosure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Typography } from "@ui/typography";
import { toast } from "sonner";

type EmailVerificationDialogProps = {
  isDialogOpen: boolean;
  verificationDialogHandler: DisclosureHandler;
  onEmailVerified: (token: string) => void;
  newEmail: string;
};

export const EmailVerificationDialog = ({
  onEmailVerified,
  verificationDialogHandler,
  newEmail,
  isDialogOpen,
}: EmailVerificationDialogProps) => {
  const sendChangeEmailVerificationCodeMutation =
    useSendChangeEmailVerificationCode({
      verificationDialogHandler,
      newEmail,
    });

  const verifyTokenMutation = useVerificationTokenMutation({
    onEmailVerified,
    newEmail,
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          verificationDialogHandler.close();
          toast.info("You cancelled the verification process.");
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify your current email</DialogTitle>
          <DialogDescription>
            We have sent you a new email verification code.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex items-center gap-2"
          action={(formData) => {
            const token = formData.get("token") as string;

            verifyTokenMutation.mutate(token);
          }}
        >
          <Input name="token" placeholder="Verification code" />

          <LoadingButton loading={verifyTokenMutation.isPending} type="submit">
            Verify
          </LoadingButton>
        </form>
        <div className="flex items-center gap-2">
          <Typography variant="muted">Didn't receive the email ?</Typography>
          <LoadingButton
            variant="filled"
            className="ml-auto mt-2"
            loading={
              verifyTokenMutation.isPending ||
              sendChangeEmailVerificationCodeMutation.isPending
            }
            onClick={() => {
              sendChangeEmailVerificationCodeMutation.mutate();
            }}
            // disabled={
            //   sendChangeEmailVerificationCodeMutation.data
            //     ? differenceInMinutes(
            //         new Date(),
            //         new Date(sendChangeEmailVerificationCodeMutation.data),
            //       ) < 1
            //     : false
            // }
          >
            Resend
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
