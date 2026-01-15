import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import connectDB from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';
import Project from '@/app/models/Project';
import ProjectHeader from '@/app/components/projects/ProjectHeader';

async function getProject(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  await connectDB();
  try {
    const project = await Project.findOne({
      _id: id,
      members: session.user.id,
    })
      .populate('members', 'name image email role')
      .lean();

    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    return null;
  }
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center min-h-screen w-full">
      <ProjectHeader project={project} />
      <main className="flex-1 overflow-auto bg-muted/20 relative">
        {children}
      </main>
    </div>
  );
}
