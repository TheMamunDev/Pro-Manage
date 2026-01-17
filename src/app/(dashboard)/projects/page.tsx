import { getServerSession } from 'next-auth';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CalendarDays, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Project from '@/app/models/Project';
import CreateProjectModal from '@/app/components/projects/ProjectModal';
import { Badge } from '@/components/ui/badge';

async function getProjects() {
  const session = await getServerSession(authOptions);
  if (!session) return [];
  await connectDB();

  const projects = await Project.find({ members: session.user.id })
    .sort({ status: 1, createdAt: -1 })
    .populate('members', 'name image')
    .populate('owner', 'name image')
    .lean();

  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your workspaces and track progress.
          </p>
        </div>
        {isAdmin && <CreateProjectModal />}
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] border border-dashed rounded-lg bg-muted/10">
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first project to get started.
          </p>
          <CreateProjectModal />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Link
              key={project._id}
              href={`/projects/${project._id}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/0 hover:border-l-primary cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={
                        project.status === 'active' ? 'default' : 'secondary'
                      }
                      className="uppercase text-[10px]"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {project.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      {format(new Date(project.startDate), 'MMM d, yyyy')} 
                    </div>
                    {project?.endDate && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                        {format(new Date(project.endDate), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0 border-t bg-muted/5 p-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={project.owner?.image} />
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {project.owner?.name?.[0] || 'O'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                      +1
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members?.map((member: any) => (
                      <Avatar
                        key={member._id}
                        className="h-8 w-8 border-2 border-background"
                        title={member.name}
                      >
                        <AvatarImage src={member.image} />
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {member.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
