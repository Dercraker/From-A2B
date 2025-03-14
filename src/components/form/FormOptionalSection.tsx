import { Label } from "@components/ui/label";
import { Switch } from "@components/ui/switch";
import type { PropsWithChildren } from "react";
import { useState } from "react";

export const FormOptionalSection = (
  props: PropsWithChildren<{
    defaultOpen?: boolean;
    label?: string;
    onToggle?: (open: boolean) => void;
  }>,
) => {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>{props.label}</Label>
        <Switch
          checked={open}
          onCheckedChange={(newOpen) => {
            setOpen(newOpen);
            if (props.onToggle) {
              props.onToggle(newOpen);
            }
          }}
        />
      </div>
      {open && props.children}
    </div>
  );
};
