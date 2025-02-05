"use client";

import { SectionLayout } from "@/components/layout/SectionLayout";
import { PoiMarkers } from "@/components/map/poiMarkers";
import { Typography } from "@/components/ui/typography";
import type { Pois } from "@/features/map/poi.type";
import { logger } from "@/lib/logger";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { Map, RenderingType } from "@vis.gl/react-google-maps";

export const MapSection = () => {
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

  const poi: Pois = [
    { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
    { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
    { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
    { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
    { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
    { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
    { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
    { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
    { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
    { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
    { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
    {
      key: "kingStreetWharf",
      location: { lat: -33.8665445, lng: 151.1989808 },
    },
    { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
    { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
    { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
  ] satisfies Pois;

  return (
    <SectionLayout
      size="lg"
      variant="card"
      className="flex items-center gap-4 max-lg:flex-col"
    >
      <Map
        id="LandingMap"
        className="h-96 w-full md:h-[30rem]"
        reuseMaps
        renderingType={RenderingType.VECTOR}
        defaultZoom={12.356}
        defaultCenter={{ lat: -33.844368306646736, lng: 151.21606084131517 }}
        mapId={"a18fd5fb0c24af78"}
        gestureHandling={"greedy"}
        maxZoom={19}
        minZoom={4}
        zoomControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          logger.debug(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom,
          )
        }
      >
        <PoiMarkers pois={poi} />
      </Map>
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
