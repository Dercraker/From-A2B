"use client";

import { Button, buttonVariants } from "@components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { MultiStepLoader } from "@components/ui/multi-step-loader";
import { RemoveVerificationTokenAction } from "@feat/account/delete/RemoveVerificationToken.action";
import { useDisclosure } from "@hooks/useDisclosure";
import { cn } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { orgConfirmDeletionAction } from "../../delete-account.action";

export type DeleteAccountCardProps = { token: string };

export const DeleteAccountCard = ({ token }: DeleteAccountCardProps) => {
  const [loading, loadingHandler] = useDisclosure(false, {
    onOpen: () => {
      deleteAccount();
    },
  });
  const [homeButtonHidden, hiddenHandler] = useDisclosure(true);
  const loadingStates = [
    {
      text: "Delete user org's",
    },
    {
      text: "Delete user account",
    },
    {
      text: "Send delete confirmation mail",
    },
  ];

  const { mutate: deleteAccount } = useMutation({
    mutationFn: async () => {
      await orgConfirmDeletionAction({ token });
    },
  });

  const { mutate: deleteToken } = useMutation({
    mutationFn: async () => {
      await RemoveVerificationTokenAction({ token });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Are you sure you want to delete your account ?</CardTitle>
        <CardDescription>
          By clicking on the button below, you confirm that you want to delete
          your account.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        <Link
          href="/orgs"
          className={buttonVariants({ variant: "filled" })}
          onClick={() => deleteToken()}
        >
          Cancel
        </Link>

        <Button onClick={() => loadingHandler.open()}>Delete Account</Button>
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={loading}
          loop={false}
          endTask={() => hiddenHandler.close()}
          duration={1500}
        >
          {!homeButtonHidden && (
            <Link
              href="/home"
              className={cn(
                buttonVariants({ variant: "default" }),
                "fixed inset-0 left-1/2 top-1/2 z-[100] flex size-fit -translate-x-1/2 items-center justify-center backdrop-blur-2xl",
              )}
              onClick={() => loadingHandler.close()}
            >
              Go Home
            </Link>
          )}
        </MultiStepLoader>
      </CardFooter>
    </Card>
  );
};
