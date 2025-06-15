import { Task } from "../types/types";
import { Dispatch, SetStateAction } from "react";
import Column from "./Column";

type Props = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function Board({ tasks, setTasks }: Props) {
  // Grupowanie zadań według statusu
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });

  return (
    <div className="flex gap-5 bg-gray-600 p-3 rounded-lg overflow-x-auto" style={{ whiteSpace: "nowrap" }}>
      {["todo", "inProgress", "blocked", "done"].map((status) => (
        <Column
          key={status}
          columnName={status}
          tasks={groupedTasks[status] || []}
        />
      ))}
    </div>
  );
}
