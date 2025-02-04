"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alertDialog } from "@/features/alert-dialog/alert-dialog-store";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { AuthError } from "next-auth";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { accountAskDeletionAction } from "./delete-account.action";

const DeleteProfilePage = () => {
  const { data } = useSession();

  if (!data?.user)
    throw new AuthError("You must be authenticated to access this resource.");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete your profile</CardTitle>
        <CardDescription>
          Deleting your account means that all your personal data will be
          permanently erased and your ongoing subscription will be terminated.
          Please be aware that this action is irreversible.
        </CardDescription>
        <CardDescription>
          Also, if you are the owner of an organization, the organization will
          be deleted and your subscription will be cancelled. All your data will
          be lost.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => {
            alertDialog.add({
              title: "Delete your account ?",
              description: "Are you sure you want to delete your profile?",
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              confirmText: data.user!.name ?? data.user!.email!,
              action: {
                label: "Delete",
                onClick: async () => {
                  const res = await accountAskDeletionAction();
                  if (!isActionSuccessful(res))
                    toast.error("Failed account deletion request", {
                      description: "Please try again later or contact support",
                    });
                  else
                    toast.success("Your deletion has been asked.", {
                      description:
                        "Please check your email for further instructions.",
                    });
                },
              },
            });
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeleteProfilePage;
