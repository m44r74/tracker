"use client";

import { useEffect, useRef, useState } from "react";
import { Task } from "../types/types";
import useStore from "../lib/store";
import { Button } from "flowbite-react";

interface Props {
  task: Task;
}

export default function TimerButton({ task }: Props) {
  const { updateTaskTime } = useStore();
  const [seconds, setSeconds] = useState(task.elapsedTime); 
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lastElapsedTime = useRef(task.elapsedTime);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newTime = prev + 1;

          if (lastElapsedTime.current !== newTime) {
            lastElapsedTime.current = newTime;
          }
          
          return newTime;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      updateTaskTime(task.id, seconds);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds, updateTaskTime, task.id]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div className="mt-4 flex items-center gap-4 text-gray-200 justify-between">
      <span className="text-sm font-mono">{formatTime(seconds)}</span>
      <Button color={isRunning ? "red" : "green"} onClick={toggleTimer}>
        {isRunning ? "Zatrzymaj" : "Start"}
      </Button>
    </div>
  );
}
