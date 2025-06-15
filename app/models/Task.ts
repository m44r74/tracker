// 📁 app/models/Task.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  id: string;
  projectId: string;
  text: string;
  description: string;
  dueDate?: string;
  priority: "niski" | "średni" | "wysoki";
  assignedTo?: {
    id: string;
    name: string;
  };
  status: "todo" | "inProgress" | "done";
  elapsedTime?: number; // w minutach lub sekundach
}

const TaskSchema = new Schema<ITask>({
  id: { type: String, required: true },
  projectId: { type: String, required: true },
  text: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  priority: {
    type: String,
    enum: ["niski", "średni", "wysoki"],
    default: "średni",
  },
  assignedTo: {
    id: { type: String },
    name: { type: String },
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "done"],
    default: "todo",
  },
  elapsedTime: { type: Number, default: 0 },
});

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
