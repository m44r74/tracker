// lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");


export const connectDB = async () => {
  if (mongoose.connections[0].readyState) console.log("MongoDB URI: ", process.env.MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
};
