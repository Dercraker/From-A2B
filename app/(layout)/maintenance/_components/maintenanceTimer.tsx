"use client";

import {
  addDays,
  differenceInMilliseconds,
  intervalToDuration,
} from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const targetDate = useMemo(
    () => (time ? new Date(Number(time) * 1000) : addDays(new Date(), 30)),
    [time],
  );

  const calculateTimeLeft = useCallback(() => {
    const difference = differenceInMilliseconds(targetDate, new Date());
    const duration = intervalToDuration({ start: 0, end: difference });

    return {
      days: duration.days ?? 0,
      hours: duration.hours ?? 0,
      minutes: duration.minutes ?? 0,
      seconds: duration.seconds ?? 0,
    } satisfies TimeLeft;
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

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
