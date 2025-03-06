import { getServerFeatureFlags } from "@lib/postHog/phFeatureFlags";
import { AuthButton } from "../auth/AuthButton";
import { HeaderBase } from "./HeaderBase";

export const Header = async () => {
  const isMaintenanceEnabled = await getServerFeatureFlags({
    flag: "IsUnderMaintenance",
  });

  return <HeaderBase>{!isMaintenanceEnabled && <AuthButton />}</HeaderBase>;
};
