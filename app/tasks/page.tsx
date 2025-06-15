"use client";
import { useEffect, useState } from "react";
import { Label, Select } from "flowbite-react";
import Board from "../components/Board";
import { Task } from "../types/types";
import useStore from "../lib/store";
import AddTaskModal from "../components/AddTaskModal";

let taskIdCounter = 7;

export default function Home() {
  const [project, setProject] = useState({
    id: "1",
    name: "Projekt A",
  });
  const [newTaskText, setNewTaskText] = useState("");

  const { tasks, projects ,setTasks } = useStore();
const handleNewTask = async () => {
  if (!newTaskText.trim()) return;

  const newTask: Partial<Task> = {
    projectId: project.id,
    text: newTaskText,
    assignedTo: null,
    description: "",
    dueDate: "",
    priority: "średni",
    status: "todo",
    elapsedTime: 0,
  };

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) throw new Error("Failed to save task");

    const savedTask = await res.json();
    setTasks((prev: Task[]) => [...prev, savedTask]); // now it’s real
    setNewTaskText("");
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    console.log(project);
   

    
  }, [project]);

  return (
    <div className="p-5 flex flex-col gap-5 bg-gray-900 h-screen">
      <div className="max-w-[200px] flex flex-col gap-2">
        <Label htmlFor="projects">Wybierz projekt</Label>
        <Select id="projects" value={project.name} onChange={(e) => setProject({
          id: projects.find((p) => p.name === e.target.value)?.id || "",
          name: e.target.value,
        })}>
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </Select>
      </div>

      <AddTaskModal projectId={project.id} />

      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
