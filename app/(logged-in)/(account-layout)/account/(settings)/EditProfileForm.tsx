"use client";

import { LoadingButton } from "@components/form/LoadingButton";
import { ImageFormItem } from "@components/images/ImageFormItem";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { ProfileFormSchema } from "@feat/account/email/editProfile.schema";
import { useUpdateProfileMutation } from "@feat/account/email/useUpdateProfileMutation.hook";
import { useDisclosure } from "@hooks/useDisclosure";
import { displayName } from "@lib/format/displayName";
import type { User } from "@prisma/client";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { BadgeCheck } from "lucide-react";
import { EmailVerificationDialog } from "./_components/emailVerificationDialog";

type EditProfileFormProps = {
  defaultValues: User;
};

export const EditProfileCardForm = ({
  defaultValues,
}: EditProfileFormProps) => {
  const form = useZodForm({
    schema: ProfileFormSchema,
    defaultValues: defaultValues,
  });

  const [isVerificationDialogOpen, verificationDialogHandler] =
    useDisclosure(false);

  const email = form.watch("email");
  const image = form.watch("image");

  const { mutate, isPending } = useUpdateProfileMutation({
    verificationDialogHandler,
    defaultEmail: defaultValues.email,
    newEmail: email,
  });

  return (
    <>
      <Form form={form} onSubmit={async (v) => mutate(v)} disabled={isPending}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageFormItem
                className="size-16 rounded-full"
                onChange={(url) => form.setValue("image", url)}
                imageUrl={image}
              />
              <CardTitle>
                {displayName({
                  email,
                  name: form.watch("name"),
                })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>Email</span>
                    {defaultValues.emailVerified ? (
                      <BadgeCheck className="size-5 text-primary" />
                    ) : (
                      <IconCircleDashedCheck className="size-5" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <LoadingButton loading={isPending}>Save</LoadingButton>
          </CardFooter>
        </Card>
      </Form>
      <EmailVerificationDialog
        isDialogOpen={isVerificationDialogOpen}
        verificationDialogHandler={verificationDialogHandler}
        newEmail={email}
        onEmailVerified={(token: string) => {
          verificationDialogHandler.close();
          mutate({ ...form.getValues(), token });
        }}
      />
    </>
  );
};
