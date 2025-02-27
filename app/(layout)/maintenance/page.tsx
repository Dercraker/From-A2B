import { EmailForm } from "@components/email/EmailForm";
import { Layout } from "@components/page/layout";
import { LogoNameSvg } from "@components/svg/LogoNameSvg";
import { getServerFeatureFlagPayload } from "@lib/postHog/phFeatureFlags";
import { IsMaintenanceEnabledSchema } from "@lib/postHog/schema/IsMaintenanceEnabled.schema";
import { Typography } from "@ui/typography";
import { SiteConfig } from "site-config";
import { MaintenanceTimer } from "./_components/maintenanceTimer";

const RoutePage = async () => {
  const data = await getServerFeatureFlagPayload({
    flag: "isMaintenanceEnabled",
  });

  if (!data) return;

  const time = IsMaintenanceEnabledSchema.parse(JSON.parse(data)).time;

  return (
    <Layout size="lg">
      <div className="flex gap-10 max-lg:flex-col">
        <div className="flex flex-col items-center">
          <LogoNameSvg className="w-48" />
          <Typography variant="h1" className="uppercase text-white">
            Coming soon!
          </Typography>
          <Typography className="text-center text-white">
            The {SiteConfig.title} application is currently undergoing
            maintenance. It will be back soon with new awesome features.
          </Typography>
        </div>
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col">
            <Typography variant="large" className="text-white">
              The maintenance will ends on
            </Typography>
            <MaintenanceTimer time={time} />
          </div>
          <div className="flex flex-col">
            <Typography className="text-white">
              Be first to get notified when {SiteConfig.title} comes back online
            </Typography>
            <EmailForm
              submitButtonLabel="Join"
              successMessage="You'r email as registered"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoutePage;
