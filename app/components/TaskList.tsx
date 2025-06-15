"use client";

import useStore from "../lib/store";
import TimerTaskCard from "./TimerTaskCard";

export default function TaskList() {
  const { tasks, currentUser } = useStore();

  return (
    <div className="space-y-4 flex gap-4">
      {tasks
        .filter((task) => task.assignedTo?.id === currentUser.id)
        .map((task) => (
          <TimerTaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}
