import { connectDB } from '@/app/lib/db';
import Task from '@/app/models/Task';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: any) {
  await connectDB();
  const task = await Task.findById(params.id);
  return NextResponse.json(task);
}

export async function PUT(req: NextRequest, { params }: any) {
  await connectDB();
  const body = await req.json();
  const updated = await Task.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: any) {
  await connectDB();
  await Task.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
