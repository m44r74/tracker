"use client";

import { Button } from "flowbite-react";
import { CSVLink } from "react-csv";
import useStore from "../lib/store";

export default function ReportCSVDownload() {
  const { tasks } = useStore();

  const csvData = tasks.map((task) => ({
    "ID Zadania": task.id,
    "Nazwa Zadania": task.text,
    "Opis": task.description,
    "Przypisane Do": `${task.assignedTo?.name} (#${task.assignedTo?.id})`,
    "Projekt ID": task.projectId,
    "Status": task.status,
    "Priorytet": task.priority,
    "Data zakończenia": task.dueDate,
    "Czas spędzony (minuty)": task.elapsedTime ?? 0,
  }));

  const headers = [
    { label: "ID Zadania", key: "ID Zadania" },
    { label: "Nazwa Zadania", key: "Nazwa Zadania" },
    { label: "Opis", key: "Opis" },
    { label: "Przypisane Do", key: "Przypisane Do" },
    { label: "Projekt ID", key: "Projekt ID" },
    { label: "Status", key: "Status" },
    { label: "Priorytet", key: "Priorytet" },
    { label: "Data zakończenia", key: "Data zakończenia" },
    { label: "Czas spędzony (minuty)", key: "Czas spędzony (minuty)" },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-300">Generowanie raportu czasu pracy</h2>
      <div>
        <CSVLink
          headers={headers}
          data={csvData}
          filename="raport_czasu_pracy.csv"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Pobierz raport CSV
        </CSVLink>
      </div>
    </div>
  );
}
