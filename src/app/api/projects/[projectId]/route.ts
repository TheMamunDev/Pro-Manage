import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Project from '@/app/models/Project';
import Task from '@/app/models/Task';

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'completed', 'archived']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  members: z.array(z.string()).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can edit projects' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = updateProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    await connectDB();
    const updateData = {
      ...validation.data,
      ...(validation.data.members && {
        members: [...new Set([...validation.data.members, session.user.id])],
      }),

      ...(validation.data.startDate && {
        startDate: new Date(validation.data.startDate),
      }),
      ...(validation.data.endDate && {
        endDate: new Date(validation.data.endDate),
      }),
    };

    const project = await Project.findByIdAndUpdate(projectId, updateData, {
      new: true,
    }).populate('members', 'name image email role');

    if (!project)
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    await connectDB();
    const project = await Project.findByIdAndDelete(params.projectId);
    if (!project)
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    await Task.deleteMany({ projectId: params.projectId });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
