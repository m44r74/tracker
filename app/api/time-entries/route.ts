import { connectDB } from '@/app/lib/db';
import TimeEntry from '@/app/models/TimeEntry';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const entry = await TimeEntry.create(body);
  return NextResponse.json(entry);
}
