"use client";

import { Task } from "../types/types";
import TimerButton from "./TimerButton";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-gray-700 p-4 rounded-xl shadow mb-4">
      <h2 className="text-xl text-gray-200 font-semibold">{task.text}</h2>
      <p className="text-gray-300">{task.description}</p>
      <p className="text-sm text-gray-200 mt-1">📅 Termin: {task.dueDate}</p>
      <p className="text-sm text-gray-200">👤 Osoba: {task.assignedTo?.name}</p>
      <TimerButton task={task} />
    </div>
  );
}
