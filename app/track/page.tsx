"use client";

import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">🕒 Task Timer</h1>
      <TaskList />
    </div>
  );
}
