import { Typography } from "@/components/ui/typography";
import { PLANS } from "@/features/plans/plans";
import { SiteConfig } from "@/site-config";
import { SectionLayout } from "../../components/layout/SectionLayout";
import AvatarCircles from "../ui/avatar-circles";
import { PricingCard } from "./PricingCard";

export const Pricing = () => {
  const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
  ];

  return (
    <SectionLayout
      size="base"
      id="pricing"
      className="flex w-full flex-col items-center gap-16"
    >
      <div className="flex w-full items-center justify-end gap-2">
        <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
        <Typography variant="h3" className="">
          138 personnes voyages avec {SiteConfig.title}
        </Typography>
      </div>
      <div className="space-y-2 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Pricing
        </Typography>
        <Typography variant="h2">
          Try and choose the best plan for your business
        </Typography>
      </div>
      <div className="flex w-full justify-center gap-4 max-md:flex-col lg:gap-8 xl:gap-12">
        {PLANS.map((card, i) => (
          <PricingCard key={i} {...card} />
        ))}
      </div>
    </SectionLayout>
  );
};
