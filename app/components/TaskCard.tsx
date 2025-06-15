import { useState } from "react";
import { Task } from "../types/types";
import { handleDragStart } from "../utils";
import { Badge, Button } from "flowbite-react";
import useStore from "../lib/store";

type Props = {
  task: Task;
  columnName: string;
};

export default function TaskCard({ task, columnName }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const { users, updateTask } = useStore();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    updateTask(editedTask); // Update directly in Zustand store
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id, columnName)}
      onDoubleClick={handleDoubleClick}
      className="task-card bg-gray-600 shadow-lg rounded p-3 cursor-move flex flex-col"
    >
      {isEditing ? (
        <>
          <input
            name="text"
            value={editedTask.text}
            onChange={handleChange}
            className="mb-2 rounded px-2 py-1 text-black bg-gray-300"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="mb-2 rounded px-2 py-1 text-black bg-gray-300"
          />
          <input
            name="dueDate"
            type="date"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="mb-2 rounded px-2 py-1 text-black bg-gray-300"
          />
          <select
            name="assignedTo"
            value={editedTask.assignedTo?.name}
            onChange={handleChange}
            className="mb-2 rounded px-2 py-1 text-black bg-gray-300"
          >
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="mb-2 rounded px-2 py-1 text-black bg-gray-300"
          >
            <option value="niski">niski</option>
            <option value="średni">średni</option>
            <option value="wysoki">wysoki</option>
          </select>
          <Button onClick={handleSave} size="sm">
            Zapisz
          </Button>
        </>
      ) : (
        <>
          <div className="task-title text-lg text-gray-300 font-semibold">{task.text}</div>
          <hr className="my-2" />
          <div className="task-title text-xs text-gray-300 font-semibold">{task.description}</div>
          <hr className="my-2" />
          <div className="grid grid-cols-3 text-sm">
            {[
              {
                icon: "📌",
                color:
                  task.priority === "wysoki"
                    ? "red"
                    : task.priority === "średni"
                      ? "yellow"
                      : "green",
                text: task.priority || "niski",
              },
              { icon: "📅", text: task.dueDate || "-" },
              { icon: "👤", text: task.assignedTo || "-" },
            ].map(({ icon, color, text }, index) => (
              <div key={index} className={`flex items-center justify-left gap-2 flex-1`}>
                <span role="img" aria-label="icon">
                  {icon}
                </span>
                <Badge className="flex-1 mr-2 p-1 flex justify-center" color={color}>
                  {typeof text === "object" && text !== null ? text.name : text}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
