import { Button } from "@components/ui/button";
import { Spotlight } from "@components/ui/spotlight";
import { Typography } from "@components/ui/typography";
import { Video } from "@components/video/video";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className="relative ">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
      <Video
        source="https://videos.pexels.com/video-files/5379990/5379990-uhd_2560_1440_24fps.mp4"
        width="100%"
        height="100%"
      >
        {/* <div className="absolute left-0 top-0 flex min-w-60 -translate-x-1/2 -translate-y-1/4 select-none flex-col items-center justify-center bg-red-400"> */}
        <div className="w- absolute  left-0 top-0 flex min-w-64 -translate-x-1/2 -translate-y-1/4 select-none flex-col items-center justify-center sm:min-w-72 md:min-w-[33rem]">
          <React.Fragment>
            <Typography variant="h1">Create your dream trip</Typography>
            <Typography variant="h3" className="text-justify">
              Explore, plan, and book your next adventure
            </Typography>
          </React.Fragment>
          <Button variant="outline">
            <Link href="#pricing" className="text-base">
              Start Now
            </Link>
          </Button>
        </div>
      </Video>
    </div>
  );
};
