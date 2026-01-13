import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Task from '@/app/models/Task';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  projectId: z.string().min(1, 'Project ID is required'),
  status: z.enum(['backlog', 'todo', 'in-progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  description: z.string().optional(),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validation = taskSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await connectDB();
    const assigneeId = validation.data.assignee || session.user.id;
    const task = await Task.create({
      ...validation.data,
      createdBy: session.user.id,
      assignee: assigneeId,
      dueDate: validation.data.dueDate
        ? new Date(validation.data.dueDate)
        : undefined,
    });

    await task.populate('assignee', 'name image');

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Task Create Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    await connectDB();
    let query: any = {};
    if (projectId) {
      query = { projectId };
    } else {
      query = { assignee: session.user.id };
    }

    const tasks = await Task.find(query)
      .populate('assignee', 'name image')
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Task Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
