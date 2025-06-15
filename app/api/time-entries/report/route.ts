import { connectDB } from '@/app/lib/db';
import TimeEntry from '@/app/models/TimeEntry';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user');
  const start = new Date(searchParams.get('start') || '');
  const end = new Date(searchParams.get('end') || '');

  const report = await TimeEntry.find({
    user: userId,
    start: { $gte: start },
    end: { $lte: end },
  }).populate('task');

  const summary = report.map(entry => ({
    task: entry.task.title,
    duration: (new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 1000 / 60, // minutes
  }));

  return NextResponse.json(summary);
}
