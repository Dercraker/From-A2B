"use client";

import { Button } from "@components/ui/button";
import { InlineTooltip } from "@components/ui/tooltip";
import type { Step } from "@generated/modelSchema";
import { phCapture } from "@lib/postHog/eventCapture";
import { useMap } from "@vis.gl/react-google-maps";
import { LocateFixed } from "lucide-react";

export type CenterMapMenuButtonProps = {
  step: Step;
  onClick: () => void;
};

export const CenterMapMenuButton = ({
  step: { latitude, longitude },
  onClick,
}: CenterMapMenuButtonProps) => {
  const map = useMap();

  const handleCenter = () => {
    map?.setCenter({
      lat: Number(latitude),
      lng: Number(longitude),
    });

    onClick();
    phCapture("UseCenterMap");
  };

  if (!map)
    return (
      <InlineTooltip title="Center map service unavailable">
        <Button
          variant="filled"
          className="flex items-center gap-2"
          disabled={Number(longitude) === 0 || Number(latitude) === 0 || !map}
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
      disabled={Number(longitude) === 0 || Number(latitude) === 0 || !map}
      onClick={handleCenter}
    >
      <LocateFixed />
      Center map on step
    </Button>
  );
};
