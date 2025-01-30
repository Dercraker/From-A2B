"use client";

import { Button } from "@/components/ui/button";
import { InlineTooltip } from "@/components/ui/tooltip";
import type { StepDto } from "@/features/steps/dto/stepDto.schema";
import { useMap } from "@vis.gl/react-google-maps";
import { LocateFixed } from "lucide-react";

export type CenterMapMenuButtonProps = {
  step: StepDto;
  onClick: () => void;
};

export const CenterMapMenuButton = ({
  step: { latitude, longitude },
  onClick,
}: CenterMapMenuButtonProps) => {
  const map = useMap();

  const handleCenter = () => {
    void map?.setCenter({
      lat: latitude,
      lng: longitude,
    });

    onClick();
  };

  if (!map)
    return (
      <InlineTooltip title="Center map service unavailable">
        <Button
          variant="filled"
          className="flex items-center gap-2"
          disabled={longitude === 0 || latitude === 0 || !map}
          onClick={handleCenter}
        >
          <LocateFixed />
          Center map on step
        </Button>
      </InlineTooltip>
    );

  return (
    <Button
      variant="filled"
      className="flex items-center gap-2"
      disabled={longitude === 0 || latitude === 0 || !map}
      onClick={handleCenter}
    >
      <LocateFixed />
      Center map on step
    </Button>
  );
};
