import { SectionLayout } from "@/components/layout/SectionLayout";
import { Typography } from "@/components/ui/typography";
import { GlobeComponent } from "./GlobeComponent";

export const GlobeSection = () => {
  const cardsContent = [
    {
      title: "Destination",
      description: "Choose your destination",
    },
    {
      title: "Dates",
      description: "Select the dates that suit you",
    },
    {
      title: "Details",
      description: "Add the details of your step",
    },
  ];

  return (
    <SectionLayout
      size="lg"
      variant="card"
      className="flex items-center max-lg:flex-col"
    >
      <GlobeComponent className="h-96 w-full md:h-[30rem]" />
      <div className="flex flex-col items-center max-lg:text-center lg:items-start lg:gap-12">
        <Typography variant="h1" className="text-primary">
          Interact with the map
        </Typography>
        <div className="flex gap-4 max-lg:flex-col lg:gap-8">
          {cardsContent.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center lg:items-start"
            >
              <Typography variant="h3">{card.title}</Typography>
              <Typography variant="lead">{card.description}</Typography>
            </div>
          ))}
        </div>
        <Typography variant="h2">Confirm and the map updates !</Typography>
      </div>
    </SectionLayout>
  );
};
