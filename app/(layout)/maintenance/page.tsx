import { EmailForm } from "@components/email/EmailForm";
import { EmailFormLoader } from "@components/email/emailForm.loader";
import { Layout } from "@components/page/layout";
import { LogoNameSvg } from "@components/svg/LogoNameSvg";
import { combineWithParentMetadata } from "@lib/metadata";
import { getServerFeatureFlagPayload } from "@lib/postHog/phFeatureFlags";
import { IsMaintenanceEnabledSchema } from "@lib/postHog/schema/IsMaintenanceEnabled.schema";
import { Typography } from "@ui/typography";
import { Suspense } from "react";
import { SiteConfig } from "site-config";
import { MaintenanceTimer } from "./_components/maintenanceTimer";
import { MaintenanceTimerLoader } from "./_loader/maintenanceTimer.loader";

export const generateMetadata = combineWithParentMetadata({
  title: "Maintenance",
  description: "The maintenance will ends soon",
});

const RoutePage = async () => {
  const data = await getServerFeatureFlagPayload({
    flag: "isUnderMaintenance",
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
            <Suspense fallback={<MaintenanceTimerLoader />}>
              <MaintenanceTimer time={time} />
            </Suspense>
          </div>
          <div className="flex flex-col">
            <Typography className="text-white">
              Be first to get notified when {SiteConfig.title} comes back online
            </Typography>
            <Suspense fallback={<EmailFormLoader />}>
              <EmailForm
                submitButtonLabel="Join"
                successMessage="You'r email as registered"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoutePage;
