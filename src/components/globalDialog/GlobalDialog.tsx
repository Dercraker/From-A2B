"use client";

import type { DialogType } from "@/features/globalDialog/GlobalDialogStore";
import { useGlobalDialogStore } from "@/features/globalDialog/GlobalDialogStore";
import dynamic from "next/dynamic";

const OrgDialogPlan = dynamic(
  async () => import("./OrgPlanDialog").then((mod) => mod.OrgPlanDialog),
  { ssr: false },
);

const DialogTypeMap: Record<DialogType, React.ComponentType> = {
  "org-plan": OrgDialogPlan,
};

/**
 * This component is used to display the global dialog.
 *
 * Example :
 *
 * Pricing table
 * User settings
 * ...
 *
 * If you want a Dialog that is displayable from anywhere without routing, you can use this component.
 *
 * @returns The dialog component to display
 */
export const GlobalDialog = () => {
  const dialogType = useGlobalDialogStore((state) => state.openDialog);

  if (!dialogType) {
    return null;
  }

  const DialogComponent = DialogTypeMap[dialogType];

  return <DialogComponent />;
};
