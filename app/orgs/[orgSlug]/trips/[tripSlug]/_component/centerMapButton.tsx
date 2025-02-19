import { Button } from "@components/ui/button";
import { InlineTooltip } from "@components/ui/tooltip";
import { useMap } from "@vis.gl/react-google-maps";
import { LocateFixed } from "lucide-react";
import { toast } from "sonner";

export type CenterMapButtonProps = {};

export const CenterMapButton = (props: CenterMapButtonProps) => {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation)
      return toast.error("Your browser doesn't support geolocation");

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        map?.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.latitude,
        });
      },
      () => {
        toast.error("Geolocation service failed");
      },
    );
  };

  return (
    <InlineTooltip title="Center Map">
      <Button
        variant="outline"
        className="mr-2 bg-primary/15 p-2"
        onClick={handleLocate}
      >
        <LocateFixed className="text-primary" />
      </Button>
    </InlineTooltip>
  );
};
