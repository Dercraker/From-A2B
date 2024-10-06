"use client";

import { LoadingButton } from "@/components/form/LoadingButton";
import { useFormStatus } from "react-dom";
import type { ButtonProps } from "../ui/button";

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton loading={pending} {...props}>
      {props.children}
    </LoadingButton>
  );
};



