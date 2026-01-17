import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Project from '@/app/models/Project';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  members: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can create projects' },
        { status: 403 }
      );
    }
    const body = await req.json();
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation }, { status: 400 });
    }
    const { name, description, startDate, endDate, members } = validation.data;
    await connectDB();

    const finalMembers = [...new Set([...(members || []), session.user.id])];

    const newProject = await Project.create({
      name,
      description,
      owner: session.user.id,
      members: finalMembers,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : undefined,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Project Create Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const projects = await Project.find({
      members: session.user.id,
    })
      .sort({ createdAt: 1 })
      .populate('owner', 'name email image');

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Project Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
