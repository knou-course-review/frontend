"use client";

import { memo, useEffect, useRef } from "react";

type TimerProps = {
  endTimer: () => void;
};

export const calculateMinutes = (time: number) => {
  return Math.floor((time - Math.floor(time / 3600) * 3600) / 60);
};

export const calculateSeconds = (time: number) => {
  return time - Math.floor(time / 3600) * 3600 - Math.floor((time - Math.floor(time / 3600) * 3600) / 60) * 60;
};

const getTime = (ms: number) =>
  `${calculateMinutes(ms).toString().padStart(2, "0")}:${calculateSeconds(ms).toString().padStart(2, "0")}`;

const ConfirmationTimer = memo(function ConfirmationTimer({ endTimer }: TimerProps) {
  const elem = useRef<HTMLSpanElement | null>(null);
  let timeLeft = 60 * 5;
  useEffect(() => {
    const intervalId = setInterval(() => {
      timeLeft -= 1;
      updateTime();
      if (timeLeft === 0) {
        clearInterval(intervalId);
        return endTimer();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const updateTime = () => {
    if (!elem.current) return;
    (elem.current as HTMLElement).innerText = getTime(timeLeft);
  };
  return <span ref={elem}>{getTime(timeLeft)}</span>;
});

export default ConfirmationTimer;
