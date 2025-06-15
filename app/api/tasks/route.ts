import { connectDB } from '@/app/lib/db';
import Task from '@/app/models/Task';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const tasks = await Task.find().populate('assignedTo');
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const task = await Task.create(body);
  return NextResponse.json(task);
}
