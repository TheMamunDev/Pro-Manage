import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Task from '@/app/models/Task';
import Project from '@/app/models/Project';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { status, priority, title, description } = body;

    await connectDB();
    const { taskId } = await params;

    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const isOwner = existingTask.assignee?.toString() === session.user.id;
    const isAdmin = session.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only update your own tasks' },
        { status: 403 }
      );
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(title && { title }),
        ...(description && { description }),
      },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { taskId: string } }
// ) {
//   return NextResponse.json({ message: 'Task deleted' });
// }
