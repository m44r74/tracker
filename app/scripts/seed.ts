import mongoose from 'mongoose';
import User from '../models/User';
import Task from '../models/Task';
import { connectDB } from '../lib/db';

async function seed() {
  try {
    await connectDB();
    console.log("Połączono z MongoDB");

    // Czyścimy kolekcje
    await User.deleteMany({});
    await Task.deleteMany({});

    // Tworzymy użytkowników
    const users = await User.insertMany([
      { name: 'Jan Kowalski', email: 'jan@example.com' },
      { name: 'Anna Nowak', email: 'anna@example.com' },
    ]);

    // Tworzymy zadania
    await Task.insertMany([
      {
        projectId: 'proj1',
        text: 'Zadanie 1',
        description: 'Opis zadania 1',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        priority: 'high',
        assignedTo: users[0]._id,
        status: 'todo',
        elapsedTime: 0,
      },
      {
        projectId: 'proj1',
        text: 'Zadanie 2',
        description: 'Opis zadania 2',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        assignedTo: users[1]._id,
        status: 'in-progress',
        elapsedTime: 120,
      },
    ]);

    console.log("Zainicjowano bazę danymi");
    process.exit(0);  // zakończ proces po sukcesie
  } catch (error) {
    console.error("Błąd podczas inicjalizacji:", error);
    process.exit(1);
  }
}

seed();
