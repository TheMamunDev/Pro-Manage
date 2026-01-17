import KanbanBoard from '@/app/components/projects/kanban/KanbanBoard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Task from '@/app/models/Task';
import '@/app/models/Project';

async function getTasks(projectId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return [];
  await connectDB();

  const tasks = await Task.find({ projectId })
    .populate('assignee', 'name image')
    .populate('projectId', 'name status endDate')
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(tasks));
}

export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasks = await getTasks(id);

  return (
    <div className="h-full w-full bg-background/50">
      <KanbanBoard projectId={id} initialTasks={tasks} />
    </div>
  );
}
