import useStore from "../lib/store";
import { Task } from "../types/types";
import { handleDragOver } from "../utils";
import TaskCard from "./TaskCard";

type Props = {
  columnName: string;
  tasks: Task[];
};

export default function Column({ columnName, tasks }: Props) {
  const moveTaskToColumn = useStore((state) => state.moveTaskToColumn);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { itemId, fromColumn } = JSON.parse(data);

    if (fromColumn !== columnName) {
      moveTaskToColumn(itemId, columnName);
    }
  };
  
  return (
    <div
      className="bg-gray-800 rounded-md p-3 min-h-[200px] w-[5000px]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="text-lg font-semibold text-gray-300 capitalize mb-3">{columnName}</h3>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnName={columnName} />
        ))}
      </div>
    </div>
  );
}
