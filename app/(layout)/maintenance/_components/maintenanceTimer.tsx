"use client";

import {
  addDays,
  differenceInMilliseconds,
  intervalToDuration,
} from "date-fns";
import { useEffect, useState } from "react";
import { TimeBox } from "./timeBox";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type MaintenanceTimerProps = {
  time: string;
};

export const MaintenanceTimer = ({ time }: MaintenanceTimerProps) => {
  const targetDate = time
    ? new Date(Number(time) * 1000)
    : addDays(new Date(), 30);

  const calculateTimeLeft = () => {
    const difference = differenceInMilliseconds(targetDate, new Date());
    const duration = intervalToDuration({ start: 0, end: difference });

    return {
      days: duration.days ?? 0,
      hours: duration.hours ?? 0,
      minutes: duration.minutes ?? 0,
      seconds: duration.seconds ?? 0,
    } satisfies TimeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="m-6 flex justify-center gap-4 max-sm:flex-wrap">
      <div className="flex gap-4">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={formatNumber(timeLeft.hours)} label="Hours" />
      </div>
      <div className="flex gap-4">
        <TimeBox value={formatNumber(timeLeft.minutes)} label="Minutes" />
        <TimeBox value={formatNumber(timeLeft.seconds)} label="Seconds" />
      </div>
    </div>
  );
};
