"use client";
import { SectionLayout } from "@components/layout/SectionLayout";
import { Counter } from "@components/ui/counter";
import { SiteConfig } from "site-config";

type StatProps = {
  number: number;
  suffix: string;
  text: string;
};

export const StatsSection = () => {
  const stats: StatProps[] = [
    {
      number: 421,
      suffix: "",
      text: `Trips created on ${SiteConfig.title}`,
    },
    {
      number: 126240,
      suffix: "Km",
      text: "Distance traveled by our users",
    },
    {
      number: 192,
      suffix: "",
      text: "J'ai pas d'idée pour celui-ci TODO.",
    },
    {
      number: 263,
      suffix: "",
      text: "Users that use our platform.",
    },
  ];

  return (
    <SectionLayout size="sm">
      <div className="grid w-full items-baseline gap-12 sm:grid-cols-2 md:-mx-5 md:max-w-none md:grid-cols-4 md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center md:px-5">
            <h4 className="mb-2 text-2xl font-bold tabular-nums md:text-3xl">
              <Counter
                from={0}
                to={stat.number}
                digit={Number.isInteger(stat.number) ? 0 : 2}
              />

              {stat.suffix}
            </h4>
            <p className="text-sm text-muted-foreground">{stat.text}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
