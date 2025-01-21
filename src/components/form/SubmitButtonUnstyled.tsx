import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButtonUnstyled = (
  props: ComponentPropsWithoutRef<"button">,
) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      disabled={props.disabled ?? pending}
    />
  );
};
