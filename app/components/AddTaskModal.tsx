"use client";

import { useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { Task, Status } from "../types/types";
import useStore from "../lib/store";

interface AddTaskModalProps {
  projectId: string;
}

let modalTaskIdCounter = 1000;

export default function AddTaskModal({ projectId }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    text: "",
    description: "",
    assignedToId: "",
    dueDate: "",
    priority: "średni",
    status: "todo" as Status,
  });

  const { users, addTask } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const assignedUser = users.find((u) => u.id === form.assignedToId);

    const newTask: Task = {
      id: String(modalTaskIdCounter++),
      projectId,
      text: form.text,
      description: form.description,
      dueDate: form.dueDate,
      priority: form.priority,
      status: form.status,
      assignedTo: assignedUser ? { id: assignedUser.id, name: assignedUser.name } : null,
      elapsedTime: 0,
    };

    addTask(newTask);

    setForm({
      text: "",
      description: "",
      assignedToId: "",
      dueDate: "",
      priority: "średni",
      status: "todo",
    });

    setOpen(false);
  };

  return (
    <>
      <div className="flex gap-2 max-w-md items-end">
        <Button onClick={() => setOpen(true)}>Dodaj zadanie</Button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-300 text-center">Nowe zadanie</h2>
            <div className="space-y-3">
              <div className="text-gray-300 mb-1">Nazwa zadania</div>
              <TextInput
                placeholder="Nowe zadanie"
                name="text"
                value={form.text}
                onChange={handleChange}
              />
              <div className="text-gray-300 mb-1">Opis zadania</div>
              <TextInput
                name="description"
                placeholder="Opis"
                value={form.description}
                onChange={handleChange}
              />
              <div className="text-gray-300 mb-1">Osoba odpowiedzialna</div>
              <Select name="assignedToId" value={form.assignedToId} onChange={handleChange}>
                <option value="">-</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <div className="text-gray-300 mb-1">Termin zadania</div>
              <TextInput
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
              <div className="text-gray-300 mb-1">Priorytet</div>
              <Select name="priority" value={form.priority} onChange={handleChange}>
                <option value="niski">Niski</option>
                <option value="średni">Średni</option>
                <option value="wysoki">Wysoki</option>
              </Select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={() => setOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSubmit}>Zapisz</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
